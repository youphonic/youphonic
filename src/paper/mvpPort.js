/*eslint-disable id-length */
/*globals Tool view project */
import store from '../store';
import { selectChunk } from '../redux/chunk';
import { synthOne, synthTwo } from '../tone/tonePatchOne';

let isPlaying;
let shapes;
let localSelectedChunk;

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

  // set state variables on new props
  shapes = props.allChunks;
  isPlaying = props.isPlaying;

  // erase drawn vector on play
  if (props.isPlaying) {
    if (localSelectedChunk) localSelectedChunk.eraseVector();
  }

  view.onFrame = () => {
    if (props.isPlaying) {
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
        shape.update();
        }
      });
    }
  };

  tool.onMouseDown = (event) => {
		const hitResult = project.hitTest(event.point, hitOptions);
    if (!isPlaying && hitResult) {
      // is allChunks is an object we could just find the
      // correct chunk by key
      shapes.forEach((shape, index) => {
        if (hitResult.item === shape.path) {
          localSelectedChunk = shape;localSelectedChunk.eraseVector();
          localSelectedChunk.drawVector();
          store.dispatch(selectChunk({
            id: shape.id,
            frequency: shape.frequency
          }));
        }
      })
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
    if (localSelectedChunk && !isPlaying) {
      localSelectedChunk.path.position.x += event.delta.x;
      localSelectedChunk.path.position.y += event.delta.y;
      localSelectedChunk.eraseVector();
      localSelectedChunk.drawVector();
    }
  };

};
