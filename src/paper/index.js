/*eslint-disable id-length */
/*globals Tool view project */
import store from '../store';
import { selectChunk } from '../redux/chunk';
import { removeChunk } from '../redux/allChunks';
import { synthOne, synthTwo } from '../tone/tonePatchOne';
import { player, drumBuffers, possibilities } from '../tone/drums'

// These variables must be kept outside drawing scope for
// proper update on receiving new props
let isPlaying;
let shapes;
let force;
let localSelectedChunk;
let arrowDrag = false;

module.exports = function(props) {
	const tool = new Tool();
	tool.minDistance = 1;
	tool.maxDistance = 30;

  const hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 5
  };

  // FORCES
  const forces = {
    wind1: new Point(0.01, 0),
    wind2: new Point(-0.01, 0),
    gravity: new Point(0, 0.1)
  };

  // set state variables on new props
  shapes = props.allChunks;
  isPlaying = props.isPlaying;

  // erase drawn vector on play
  if (props.isPlaying) {
    if (localSelectedChunk) localSelectedChunk.eraseVector();
  }

  view.onFrame = () => {
    if (isPlaying) {
      shapes.forEach(shape => {
        if (shape.isMoving) {
          shapes.forEach(innerShape => {
            if (innerShape.id !== shape.id) {
              if (shape.path.intersects(innerShape.path)) {
                synthOne.triggerAttackRelease(innerShape.frequency, '8n');
                // synthTwo.triggerAttackRelease(shape.frequency, '8n');
                if (shape.drum) {
                  player.buffer = drumBuffers.get(shape.drum);
                  player.start();
                }
                shape.respondToHit(innerShape);
              }
            }
          });
        }
        // this is temporary for PhysBall & Attractor
        if (shape.type === 'physics') {
          shape.applyForce(forces.gravity);
        } else if (shape.type === 'attractor') {
          shape.fixed = true;
          shapes.forEach(otherShape => {
            if (otherShape.isMoving && otherShape.id !== shape.id) {
              force = shape.calculateAttraction(otherShape);
              otherShape.applyForce(force);
            }
          });
        }
        shape.update();
      });
    }
  };

  tool.onMouseDown = (event) => {
    arrowDrag = false;
		const hitResult = project.hitTest(event.point, hitOptions);
    if (!isPlaying && hitResult && hitResult.type === 'fill') {
      if (localSelectedChunk) localSelectedChunk.eraseVector();
      shapes.forEach((shape, index) => {
        if (hitResult.item === shape.path) {
          localSelectedChunk = shape;
          localSelectedChunk.drawVector();
          store.dispatch(selectChunk({
            id: shape.id,
            frequency: shape.frequency
          }));
        }
      })
    } else if (hitResult && hitResult.item && (hitResult.item.type === 'vectorArrow')) {
      arrowDrag = true;
    } else if (localSelectedChunk) {
      // reset selected chunk to null and update state
      localSelectedChunk.eraseVector()
      localSelectedChunk = null;
      store.dispatch(selectChunk({}));
    }
  };

  tool.onMouseMove = (event) => {
    if (event.item) {
      event.item.selected = true;
    } else {
      project.activeLayer.selected = false;
    }
  };

  tool.onMouseDrag = (event) => {
    if (arrowDrag) {
      localSelectedChunk.dragVector(event.point)
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
    }
  }

};
