/*eslint-disable id-length */
/*globals Tool view project */
import store from '../store';
import { selectChunk } from '../redux/chunk';
import { removeChunk } from '../redux/allChunks';
import { togglePlay } from '../redux/play';
import { synthOne, synthTwo } from '../tone/tonePatchOne';
import { player, drumBuffers, possibilities } from '../tone/drums';

// These variables must be kept outside drawing scope for
// proper update on receiving new props
let isPlaying;
let shapes;
let force;
let localSelectedChunk;
let isVectorArrowBeingDragged = false;

module.exports = function(props) {
  // tool represents mouse/keyboard input
	const tool = new Tool();
	tool.minDistance = 1;
	tool.maxDistance = 30;

  // options object sent to project.hitTest
  // represents types of Paper.js objects that will be tested against
  const hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
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

  // when play is called, erase any currently drawn vector
  if (props.isPlaying) {
    if (localSelectedChunk) localSelectedChunk.eraseVector();
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
                if (innerShape.type === 'string') {
                  innerShape.triggerAnimate(event.time)
                  innerShape.triggerSynth();
                } else {
                  synthOne.triggerAttackRelease(innerShape.frequency, '8n');
                  if (shape.frequency) synthTwo.triggerAttackRelease(shape.frequency, '8n');
                  if (shape.drum) {
                    player.buffer = drumBuffers.get(shape.drum);
                    player.start();
                  }
                  // call shape's respond to hit function
                  shape.respondToHit(innerShape);
                }
              }
            }
          });
        }
        // this is temporary for PhysBall & Attractor
        if (shape.type === 'physics') {
          shape.applyForce(forces.gravity);
        } else if (shape.type === 'attractor') {
          // shape.fixed = true;
          shapes.forEach(otherShape => {
            if (otherShape.isMoving && otherShape.id !== shape.id) {
              force = shape.calculateAttraction(otherShape);
              otherShape.applyForce(force);
            }
          });
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
    if (!isPlaying && hitResult && hitResult.type === 'fill') {
      // erase currently drawn vector if necessary
      if (localSelectedChunk) localSelectedChunk.eraseVector();
      // search for the clicked shape
      shapes.forEach((shape, index) => {
        if (hitResult.item === shape.path) {
          // store currently clicked shape, draw its vector, update store
          localSelectedChunk = shape;
          localSelectedChunk.drawVector();
          store.dispatch(selectChunk({
            id: shape.id,
            frequency: shape.frequency
          }));
        }
      })
    } else if (hitResult && hitResult.item && (hitResult.item.type === 'vectorArrow')) {
      // if clicked item is a vector, enable vector dragging
      isVectorArrowBeingDragged = true;
    } else if (localSelectedChunk) {
      // reset selected chunk to null and update state to none selected
      localSelectedChunk.eraseVector()
      localSelectedChunk = null;
      store.dispatch(selectChunk({}));
    }
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
      localSelectedChunk.dragVector(event.point)
    // drag selected chunk, redraw vector
    } else if (localSelectedChunk && !isPlaying) {
      localSelectedChunk.path.position.x += event.delta.x;
      localSelectedChunk.path.position.y += event.delta.y;
      localSelectedChunk.eraseVector();
      localSelectedChunk.drawVector();
    }
  };

  // key listener
  tool.onKeyDown = (event) => {
    // delete Chunk on backspace deletion
    if (event.key === 'backspace' && localSelectedChunk) {
      store.dispatch(removeChunk(localSelectedChunk));
      localSelectedChunk.eraseVector();
      localSelectedChunk.path.remove();
      localSelectedChunk = null;
      store.dispatch(selectChunk({}));
    // toggle play on spacebar
    } else if (event.key === 'space') {
      if (localSelectedChunk) {
        localSelectedChunk.eraseVector();
        localSelectedChunk.path.remove();
        localSelectedChunk = null;
        store.dispatch(selectChunk({}));
      }
      store.dispatch(togglePlay(isPlaying));
    }
  }

};
