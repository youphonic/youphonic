/*eslint-disable id-length */
/*globals Tool view project */
import store from '../store';
import colors from '../colors';
import { selectChunk } from '../redux/chunk';
import { addChunk, removeChunk } from '../redux/allChunks';
import { togglePlay } from '../redux/play';
import { synthOne, synthTwo } from '../tone/tonePatchOne';
import { player, drumBuffers, possibilities } from '../tone/drums';
import { nearIntersect } from '../chunks/utils';
import { deconstruct, reconstruct } from './saver';


// These variables must be kept outside drawing scope for
// proper update on receiving new props
let isPlaying;
export let shapes = [];
let force;
let localSelectedChunk;
let isVectorArrowBeingDragged = false;
let isRopeEndBeingDragged = false;
let ropeEndSelected = false;
let grid = 20; // was 2
let shiftPressed = false;
let appState;


export const shapesFilterOutId = (id) => {
	shapes = shapes.filter( shape => shape.id !== id);
};

export const removeAllShapePaths = () => {
  shapes.forEach(shape => {
		if (shape.type === 'fizzler') shape.removeAllParticles();
    shape.path.remove();
  });
};

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

  // Force Constants
  const forces = {
    wind1: new Point(0.01, 0),
    wind2: new Point(-0.01, 0),
    gravity: new Point(0, 0.1)
  };

  // set state variables on new props
  shapes = props.allChunks;
  isPlaying = props.isPlaying;
  appState = props.appState;

  // when play is called, erase any currently drawn vector
  if (props.isPlaying) {
    if (localSelectedChunk) {
			localSelectedChunk.eraseVector();
			localSelectedChunk.eraseAlignment();
		}
  }

  // main drawing Loop
  view.onFrame = (event) => {
    // only update shapes if playing state is enabled
    if (isPlaying) {
      // iterate through every shape
      shapes.forEach(shape => {
        // if shape is moving, look for collisions
        if (shape.isMoving) {
          shapes.forEach(innerShape => {
            // do not check shape intersections against itself
            if (innerShape.id !== shape.id) {
              if (shape.path.intersects(innerShape.path)) {
                // hard coded: trigger inner shape's synth on impact
                // eventually, this should be dependent upon a shape's settings
                // this 'string' if check is temporary
                if (innerShape.type === 'rope') {
                  innerShape.triggerAnimate(event.time);
                } else {
                  if (shape.drum) {
                    player.buffer = drumBuffers.get(shape.drum);
                    player.start();
                  }
                  if (innerShape.type === 'drone') {
										// ?temporary functionality? -- toggle the drone on/off
										// when the drone chunk is hit by a moving chunk
										innerShape.onOff(0, 1, event.time);
                  }
                  // if not a photon, call shape's respond to hit function and play synth
                  if (shape.type !== 'photon') {
                    synthOne.triggerAttackRelease(innerShape.frequency, '8n');
                    if (shape.frequency) synthTwo.triggerAttackRelease(shape.frequency, '8n');
                    shape.respondToHit(innerShape);
                  } else {
                    if (!shape.alreadyTriggeredChunkIds.includes(innerShape.id)) {
                      synthOne.triggerAttackRelease(innerShape.frequency, '8n');
                      shape.addTriggeredChunk(innerShape.id)
                    }
                  }
                }
              }
            }
          });
        }
        if (shape.type === 'physics') {
          shape.applyForce(forces.gravity);
        } else if (shape.type === 'drone') {
          shape.shouldSpin(isPlaying, event.time);
        } else if (shape.type === 'attractor') {
          shapes.forEach(otherShape => {
            if (otherShape.isMoving && otherShape.id !== shape.id) {
              force = shape.calculateAttraction(otherShape);
              otherShape.applyForce(force);
            }
          });
        } else if (shape.type === 'fizzler') {
          shape.generateParticles();
          // always update the particles that fizzler emitted
          shape.updateParticles();
        }
        // update every moving shape's position each frame
        shape.update(event.time);
      });
    }
  };

  // respond to mouseDown events
  tool.onMouseDown = (event) => {
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
      // Group path in order to compare to local state in shapes array
      if (hitResult.item.parent.className === 'Group') hitResult.item = hitResult.item.parent;
      // erase currently drawn vector if necessary
      if (localSelectedChunk) {
				localSelectedChunk.eraseVector();
				localSelectedChunk.eraseAlignment();
			}
      // search for the clicked shape
      shapes.forEach((shape, index) => {
        if (hitResult.item === shape.path) {
          // store currently clicked shape, draw its vector, update store
          localSelectedChunk = shape;
          localSelectedChunk.drawVector();
					localSelectedChunk.drawAlignment();
          store.dispatch(selectChunk({
            id: shape.id,
            frequency: shape.frequency
          }));
        }
      });

      // clone Chunk if option/alt key is pressed
      if(event.modifiers.option) {
        let duplicate = clone(localSelectedChunk);
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
      store.dispatch(selectChunk({}));
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
			localSelectedChunk.path.position = nearIntersect(localSelectedChunk, shapes, event.delta, event.point, grid);
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

// helper function - clone and return a new copy of Chunk
  function clone(chunk) {
    let duplicateObj = deconstruct([chunk]);
    for (let key in duplicateObj) {
			let chunk = duplicateObj[key];
			// Give new chunks an offset
			if (chunk.x && chunk.y && !chunk.redrawPos) {
				chunk.x += chunk.radius;
				chunk.y += chunk.radius;
			} else if (chunk.redrawPos) {
				chunk.redrawPos.x += grid;
				chunk.redrawPos.y += grid;
			}
      // update property format to suit the reconstruct function
      chunk.direction = [, chunk.direction.x, chunk.direction.y];
      if (chunk.redrawPos) {
        chunk.redrawPos = [, chunk.redrawPos.x, chunk.redrawPos.y];
      }
    }
    let duplicate = reconstruct(duplicateObj)[0];
		delete duplicate.x;
		delete duplicate.y;
		console.log('chunk', chunk);
		console.log('clone', duplicate);

    return duplicate;
  }
