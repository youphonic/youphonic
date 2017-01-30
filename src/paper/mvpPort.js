/*eslint-disable id-length */
/*globals Tool view */
import store from '../store';
import { selectChunk } from '../redux/chunk';
import { synthOne, synthTwo } from '../tone/tonePatchOne';

module.exports = function() {
	var tool = new Tool();
	tool.minDistance = 1;
	tool.maxDistance = 30;

  let shapes = store.getState().allChunks;


  view.onFrame = () => {
    shapes.forEach(shape => {
      if (shape.isMoving) {
        shape.path.position.x += shape.direction.x;
        shape.path.position.y += shape.direction.y;
        shapes.forEach(innerShape => {
          if (!innerShape.isMoving) {
            if (shape.path.getIntersections(innerShape.path).length > 0) {
              shape.direction.x *= -1;
              shape.direction.y *= 1;
            }
          }
        });
      }
    });
  };

  tool.onMouseDown = (event) => {
    console.log(event.point);
  };

};
