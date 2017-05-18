/*eslint-disable id-length */
/*globals Tool view project */
import store from '../store';
import colors from '../colors';

import { player, drumBuffers, possibilities } from '../tone/drums';
import { nearIntersect } from '../chunks/utils';
import { deconstruct, reconstruct } from './saver';
import { clone } from './utils'
import { save, load } from './saver';


// These variables must be kept outside drawing scope for
// proper update on receiving new props
export let allChunks = [];
export let movingChunks = [];
let isPlaying;
let force;
let localSelectedChunk;
let isVectorArrowBeingDragged = false;
let isRopeEndBeingDragged = false;
let ropeEndSelected = false;
let grid = 32; // was 25
let gridDots;
let shiftPressed = false;
let appState;
let keyboardInteractionEnabled = false;


export const drawnChunksFilterOutId = (id) => {
	allChunks = allChunks.filter( shape => shape.id !== id);
  movingChunks = movingChunks.filter( shape => shape.id !== id);
};

export const removeAllShapePaths = () => {
  allChunks.forEach(shape => {
		if (shape.type === 'fizzler') shape.removeAllParticles();
    shape.path.remove();
  });
};

// create another
function makeMovingChunksArray(allChunks) {
  return allChunks.filter(chunk => !chunk.fixed);
}

export default function(props) {
  // tool represents mouse/keyboard input
	const tool = new Tool();
	if (grid) {
		tool.fixedDistance = grid;
	} else {
		tool.minDistance = 1;
		tool.maxDistance = 30;
	}

  // options object sent to project.hitTest
  // represents types of Paper.js objects that will be tested against
  const hitOptions = {
    // segments: true,
    stroke: true,
    fill: true,
    ends: true,
    tolerance: 5
  };


  // set state variables on new props
  allChunks = props.allChunks;
  isPlaying = props.isPlaying;
  appState = props.appState;
  allChunks = props.allChunks;
  keyboardInteractionEnabled = props.keyboardInteractionEnabled;
  movingChunks = makeMovingChunksArray(props.allChunks);

	if (!gridDots) gridDots = new Group();
	// Draw the grid if it hasn't been drawn and it's toggled on
	if (props.canvas.displayGrid && !gridDots.children.length) {
		for (var i = grid; i < window.innerHeight; i += grid) {
			for (var j = grid; j < window.innerWidth; j += grid) {
				let gridDot = new Path.Circle({
					center: [j, i],
					radius: 1,
					fillColor: 'black'
				});
				gridDots.addChild(gridDot);
			}
		}
	} else if (!props.canvas.displayGrid) {
		gridDots.removeChildren();
	}

  // when play is called, erase any currently drawn vector
  if (props.isPlaying) {
    if (localSelectedChunk) {
			localSelectedChunk.eraseVector();
			localSelectedChunk.eraseAlignment();
		}
  }

  // on Canvas resize
  view.onResize = (event) => {

  }

  // main drawing Loop
  view.onFrame = (event) => {
    // only update Chunk if playing state is enabled
    if (isPlaying) {
      // get rid of the grid
			gridDots.removeChildren();
      // iterate through every moving shape
      allChunks.forEach(shape => {
        // check for collisions with every other shape
        movingChunks.forEach(innerShape => {
          // do not check shape intersections against itself
          if (innerShape.id !== shape.id) {
            if (shape.path.intersects(innerShape.path)) {
              // on intersect, trigger reaction from both
              shape.react(innerShape, event.time);
              innerShape.react(shape, event.time);
              innerShape.respondToHit(shape);
            }
          }
        });

        if (shape.type === 'attractor') {
          movingChunks.forEach(otherShape => {
            if (otherShape.id !== shape.id && otherShape.type !== 'photon') {
              force = shape.calculateAttraction(otherShape);
              otherShape.applyForce(force);
            }
          });
        }

        // update every moving shape's position each frame
        shape.update(event.time);
        shape.move(event.time);
      });
    }
  };

  // goes on view - doubleClick events bubble up from whatever was clicked
  view.onDoubleClick = (event) => {
    if (localSelectedChunk) {
      props.openShapeSettings();
    }
  }

  // respond to mouseDown events
  tool.onMouseDown = (event) => {
    props.selectChunk({});
    isVectorArrowBeingDragged = false;
		const hitResult = project.hitTest(event.point, hitOptions);
    // check to see if mouse is clicking the body ('fill') of a Chunk
    if (!isPlaying && hitResult && (hitResult.type === 'fill' || (hitResult.item && hitResult.item.name === 'ropeBody'))) {
      // if a Rope endpoint is selected, set the corner to drag mode
      if (hitResult.item.name === 'ropeBody' && hitResult.type === 'segment') {
        // keep track of which end of the rope was selected
        ropeEndSelected = (!hitResult.segment.next)
        isRopeEndBeingDragged = true;
      }

      // if a fill that is part of a Group is selected, this will give us access to the
      // Group path in order to compare to local state in allChunks array
      if (hitResult.item.parent.className === 'Group') hitResult.item = hitResult.item.parent;
      // erase currently drawn vector if necessary
      if (localSelectedChunk) {
				localSelectedChunk.eraseVector();
				localSelectedChunk.eraseAlignment();
			}
      // search for the clicked shape
      allChunks.forEach((shape, index) => {
        if (hitResult.item === shape.path) {
          // store currently clicked shape, draw its vector, update store
          localSelectedChunk = shape;
          localSelectedChunk.drawVector();
					localSelectedChunk.drawAlignment();
          props.selectChunk(shape);
        }
      });

      // clone Chunk if option/alt key is pressed
      if(event.modifiers.option) {
        let duplicate = clone(localSelectedChunk, grid);
        localSelectedChunk = duplicate;
        props.addChunk(duplicate);
        props.selectChunk(duplicate);
      }

    // allow dragging if rope edge point is clicked
    } else if (!isPlaying && hitResult && hitResult.type === 'segment' && hitResult.item.name === 'ropeBody') {
      isRopeEndBeingDragged = true;
    } else if (hitResult && hitResult.item && (hitResult.item.type === 'vectorArrow')) {
      // if clicked item is a vector, enable vector dragging
      isVectorArrowBeingDragged = true;
    } else if (localSelectedChunk) {
      // reset selected chunk to null and update state to none selected
      localSelectedChunk.eraseVector();
			localSelectedChunk.eraseAlignment();
      localSelectedChunk = null;
    }
  };

	tool.onMouseUp = (event) => {
		if (localSelectedChunk) {
			localSelectedChunk.eraseAlignment();
		}
    isRopeEndBeingDragged = false;
	};

  // display item paths on mouseOver
  tool.onMouseMove = (event) => {
    if (event.item) {
      event.item.selected = true;
    } else {
      project.activeLayer.selected = false;
    }
  };

  // respond to mouseDrag
  tool.onMouseDrag = (event) => {
    // if in vector drawing mode, call selected Chunk's drag function
    if (isVectorArrowBeingDragged) {
			localSelectedChunk.dragVector(event.point, shiftPressed)
    // drag selected chunk, redraw vector
    } else if (isRopeEndBeingDragged) {
      localSelectedChunk.onDrag(event, ropeEndSelected);
    } else if (localSelectedChunk && !isPlaying) {
			// Older non-snapping logic
			// localSelectedChunk.path.position.x += Math.round(event.delta.x / grid) * grid;
      // localSelectedChunk.path.position.y += Math.round(event.delta.y / grid) * grid;
			// New snapping logic
      let newCoords = nearIntersect(localSelectedChunk, allChunks, event.delta, event.point, grid);
			localSelectedChunk.path.position = new Point(...newCoords)
      localSelectedChunk.eraseVector();
      localSelectedChunk.drawVector();
      localSelectedChunk.eraseAlignment();
      localSelectedChunk.drawAlignment();

      //
			if (localSelectedChunk.updateRedrawPos) {
				localSelectedChunk.updateRedrawPos();
			}

      // update Emitter's home position - emitter is reset to this position after each animation loop
      if (localSelectedChunk.type === 'emitter') {
        localSelectedChunk.homePosition = new Point(localSelectedChunk.path.position.x, localSelectedChunk.path.position.y)
      }

			if (localSelectedChunk.type === 'pendulum') {
				localSelectedChunk.erasePendulum();
				localSelectedChunk.drawPendulum();
			}

      if (localSelectedChunk.type === 'rope') {
        localSelectedChunk.updateStartEnd();
      }
    }
  };
  // key listener
  tool.onKeyDown = (event) => {
    if (!appState || keyboardInteractionEnabled) return;
    // delete Chunk on backspace deletion
    if (event.key === 'backspace' && localSelectedChunk) {
      props.removeChunk(localSelectedChunk);
      localSelectedChunk.eraseVector();
			localSelectedChunk.eraseAlignment();
      localSelectedChunk.path.remove();
      localSelectedChunk = null;
      props.selectChunk({});
    // toggle play on spacebar
    } else if (event.key === 'space') {
      if (localSelectedChunk) {
        localSelectedChunk.eraseVector();
				localSelectedChunk.eraseAlignment();
        localSelectedChunk = null;
        props.selectChunk({});
      }
			if (!isPlaying) {
				// this saves all chunks to local storage
				// for now ...
				save(allChunks);
				// this hides the settings component
				props.startCanvas();
			} else {
				// Gets all saved chunks off local storage
				// And remove previous chunks from both
				// Paper project and Redux Store
				load(allChunks, props.clearAllChunks, props.addChunk);
			}
      props.togglePlay(isPlaying);
    } else if (event.key === 'shift') {
			shiftPressed = true;
		}
  };

	tool.onKeyUp = (event) => {
		shiftPressed = false;
	};

}
