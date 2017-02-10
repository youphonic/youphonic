/*eslint-disable id-length */
/*globals Tool view project */
import store from '../store';
import colors from '../colors';

import { selectChunk } from '../redux/chunk';
import { clearAllChunks, addChunk, removeChunk } from '../redux/allChunks';
import { togglePlay } from '../redux/play';
import { openShapeSettings, closeShapeSettings } from '../redux/navState'

import { synthOne, synthTwo } from '../tone/tonePatchOne';
import { player, drumBuffers, possibilities } from '../tone/drums';
import { nearIntersect } from '../chunks/utils';
import { deconstruct, reconstruct } from './saver';
import { clone } from './utils'


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
export let grid = 10; // was 2
let shiftPressed = false;
let appState;


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
  movingChunks = makeMovingChunksArray(props.allChunks);

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
      store.dispatch(openShapeSettings())
    }
  }

  // respond to mouseDown events
  tool.onMouseDown = (event) => {
    store.dispatch(selectChunk({}));
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
          store.dispatch(selectChunk(shape));
        }
      });

      // clone Chunk if option/alt key is pressed
      if(event.modifiers.option) {
        let duplicate = clone(localSelectedChunk, grid);
        localSelectedChunk = duplicate;
        store.dispatch(addChunk(duplicate));
        store.dispatch(selectChunk(duplicate));
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
			localSelectedChunk.path.position = nearIntersect(localSelectedChunk, allChunks, event.delta, event.point, grid);
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
    if (!appState) return;
    // delete Chunk on backspace deletion
    if (event.key === 'backspace' && localSelectedChunk) {
      store.dispatch(removeChunk(localSelectedChunk));
      localSelectedChunk.eraseVector();
			localSelectedChunk.eraseAlignment();
      localSelectedChunk.path.remove();
      localSelectedChunk = null;
      store.dispatch(selectChunk({}));
    // toggle play on spacebar
    } else if (event.key === 'space') {
      if (localSelectedChunk) {
        localSelectedChunk.eraseVector();
				localSelectedChunk.eraseAlignment();
        localSelectedChunk = null;
        store.dispatch(selectChunk({}));
      }
      store.dispatch(togglePlay(isPlaying));
    } else if (event.key === 'shift') {
			shiftPressed = true;
		}
  };

	tool.onKeyUp = (event) => {
		shiftPressed = false;
	};

}
