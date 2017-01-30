/*eslint-disable id-length */
/*globals Tool view project */
import store from '../store';
import { selectChunk } from '../redux/chunk';
import { synthOne, synthTwo } from '../tone/tonePatchOne';

module.exports = function() {
	const tool = new Tool();
	tool.minDistance = 1;
	tool.maxDistance = 30;

  const hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 5
  };

  let shapes = store.getState().allChunks,
      inPlayMode = store.getState().isPlaying;

  let path,
      locked;


  view.onFrame = () => {
    if (inPlayMode) {
      locked = false;
      shapes.forEach(shape => {
        if (shape.isMoving) {
          shape.path.position.x += shape.direction.x;
          shape.path.position.y += shape.direction.y;
          shapes.forEach(innerShape => {
            if (!innerShape.isMoving) {
              if (shape.path.getIntersections(innerShape.path).length > 0) {
                synthOne.triggerAttackRelease('C4', '8n');
                shape.direction.x *= -1;
                shape.direction.y *= 1;
              }
            }
          });
        }
      });
    } else {
      locked = true;
    }
  };

  tool.onMouseDown = (event) => {
		const hitResult = project.hitTest(event.point, hitOptions);
    if (hitResult) {
      console.log('HIT RESULT***8', hitResult);
      path = hitResult.item;
      // store.dispatch(selectChunk({
      //   id: shape.id,
      //   frequency: shape.frequency
      // }));
    } else {
      path = null;
    }
  };

  tool.onMouseMove = (event) => {
    project.activeLayer.selected = false;
    if (event.item) event.item.selected = true;
  };

  tool.onMouseDrag = (event) => {
    console.log('PLAYMODE', inPlayMode, 'UI-LOCKED', locked);
    if (path) {
      path.position.x += event.delta.x;
      path.position.y += event.delta.y;
    }
  };

};
