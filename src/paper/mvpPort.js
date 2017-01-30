/*eslint-disable id-length */
/*globals Tool view project */
import store from '../store';
import { selectChunk } from '../redux/chunk';
import { synthOne, synthTwo } from '../tone/tonePatchOne';

let isPlaying;

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

  let path;
  let shapes = props.allChunks;

  isPlaying = props.isPlaying;

  view.onFrame = () => {
    if (props.isPlaying) {
      shapes.forEach(shape => {
        if (shape.isMoving) {
          shape.path.position.x += shape.direction.x;
          shape.path.position.y += shape.direction.y;
          shapes.forEach(innerShape => {
            if (!innerShape.isMoving) {
              if (shape.path.getIntersections(innerShape.path).length > 0) {
                synthOne.triggerAttackRelease(innerShape.frequency, '8n');
                shape.respondToHit(innerShape);
              }
            }
          });
          shape.update();
        }
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
