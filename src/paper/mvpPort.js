/*eslint-disable id-length */
/*globals Tool view project */
import store from '../store';
import { selectChunk } from '../redux/chunk';
import { synthOne, synthTwo } from '../tone/tonePatchOne';

let isPlaying;
let shapes;
let force;

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

  let path;

  // set state variables on new props
  shapes = props.allChunks;
  isPlaying = props.isPlaying;

  view.onFrame = () => {
    if (isPlaying) {
      shapes.forEach(shape => {
        if (shape.isMoving) {
          shapes.forEach(innerShape => {
            if (innerShape.id !== shape.id) {
              if (shape.path.intersects(innerShape.path)) {
                synthOne.triggerAttackRelease(innerShape.frequency, '8n');
                synthTwo.triggerAttackRelease(shape.frequency, '8n');
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
		const hitResult = project.hitTest(event.point, hitOptions);
    if (hitResult) {
      path = hitResult.item;

      // is allChunks is an object we could just find the
      // correct chunk by key
      shapes.forEach(shape => {
        if (path === shape.path) {
          store.dispatch(selectChunk({
            id: shape.id,
            frequency: shape.frequency
          }));
        }
      })
    } else {
      path = null;
      // reset selected chunk to null
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
    if (path && !isPlaying) {
      path.position.x += event.delta.x;
      path.position.y += event.delta.y;
    }
  };

};
