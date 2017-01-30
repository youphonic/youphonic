/*eslint-disable id-length */
import store from '../store';
import { selectChunk } from '../redux/chunk';
import { synthOne, synthTwo }  from '../tone/tonePatchOne';


const sketch = (p5) => {
  let hit;
  let xOffset;
  let yOffset;
  let shapes = [];
  let locked = false;
  let playing = false;
  let currentShape = 0;
  let mouseOffsetConstX = -(window.innerWidth / 2);
  let mouseOffsetConstY = -(window.innerHeight / 2);

  // FORCES
  const forces = {
    wind1: p5.createVector(0.01, 0),
    wind2: p5.createVector(-0.01, 0),
    gravity: p5.createVector(0, 0.1)
  };


  p5.setup = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL);
    p5.rectMode(p5.RADIUS);
    p5.ellipseMode(p5.RADIUS);
    p5.angleMode(p5.RADIANS);
  };


  p5.myCustomRedrawAccordingToNewPropsHandler = (props) => {
    shapes = [...props.allChunks];
    playing = props.isPlaying;
  };


  p5.draw = () => {
    p5.background(169, 215, 191);
    p5.stroke(255, 240, 213);
    p5.fill(225, 139, 115);

    shapes = shapes.map(shape => {
      // edit mode
      if (!playing) {
        // check if mouse is in bounds of a Chunk
        shape.overBox = (
          p5.mouseX + mouseOffsetConstX > shape.position.x - shape.radius &&
          p5.mouseX + mouseOffsetConstX < shape.position.x + shape.radius &&
          p5.mouseY + mouseOffsetConstY > shape.position.y - shape.radius &&
          p5.mouseY + mouseOffsetConstY < shape.position.y + shape.radius
        );

      // play mode
      } else {
        if (shape.shape) {
          shape.position = shape.position.add(shape.velocity);

          // add bounce dynamic to edges of canvas
          if (
            shape.position.y < (0 - p5.height / 2) ||
            shape.position.y > p5.height / 2) {
            shape.velocity.y *= -1;
          }
          if (
            shape.position.x < (0 - p5.width / 2) ||
            shape.position.x > p5.width / 2) {
            shape.velocity.x *= -1;
          }

          // check for moving - stationary collisions
          if (!shape.isMoving) {

            hit = shapes.some(movingShape => {
              // a shape can't hit itself
              if (movingShape.id === shape.id) return false;

              const collision = p5.collideCircleCircle(
                movingShape.position.x,
                movingShape.position.y,
                movingShape.radius * 2,
                shape.position.x,
                shape.position.y,
                shape.radius * 2
              );

              // moving shape's in response to hit
              // these physics are hard coded for MVP
              if (collision) {
                if (movingShape.frequency) {
                  synthTwo.triggerAttackRelease(movingShape.frequency, '8n');
                }

                let motion = Math.abs(movingShape.velocity.x) +
                             Math.abs(movingShape.velocity.y);

                let xV = movingShape.velocity.x;
                let yV = movingShape.velocity.y;

                if (xV === 0 && yV === motion) {
                  movingShape.velocity.x = -motion;
                  movingShape.velocity.y = 0;
                } else if (xV === -motion && yV === 0) {
                  movingShape.velocity.x = 0;
                  movingShape.velocity.y = -motion;
                } else if (xV === 0 && yV === -motion) {
                  movingShape.velocity.x = motion;
                  movingShape.velocity.y = 0;
                } else if (xV === motion && yV === 0) {
                  movingShape.velocity.x = 0;
                  movingShape.velocity.y = motion;
                } else {
                  movingShape.velocity.x *= -1;
                  movingShape.velocity.y *= -1;
                }
              }

              return collision;
            });

            // stationary shape's response to hit
            if (hit) {
              synthOne.triggerAttackRelease(shape.frequency, '8n');
              shape.color = shape.hitColor;
              shape.hit = true;
              shape.hitCount = 15;
            }
          }

          // draw the shape
          // this is hacky for now... should eventually be tied to Tone events
          if (shape.hitCount > 0 && shape.hit) {
            shape.hitCount--;
          } else {
            shape.color = [255, 240, 213];
            shape.hit = false;
          }
        } else {
          shape.applyForce(shape.velocity.x >= 0 ? forces.wind1 : forces.wind2);
          shape.applyForce(forces.gravity);

          shape.update();
          shape.checkEdges();
        }
      }

      p5.fill(...shape.color);

      if (shape.shape) {
        p5[shape.shape](...shape.arguments);
      } else {
        shape.display();
      }

      // always return shape
      return shape;
    });
  };


  p5.windowResized = () => {
    p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL);
    p5.rectMode(p5.RADIUS);
    p5.ellipseMode(p5.RADIUS);
    p5.angleMode(p5.RADIANS);
  };


  p5.mousePressed = () => {
    // do not allow clicks around the 'update settings' button
    if (
      p5.mouseX > window.innerWidth - 177 &&
      p5.mouseY > window.innerHeight - 51 ||
      !store.getState().appState
    ) return;

    // lock screen if any are clicked
    locked = shapes.some((shape, index) => {

      if (shape.overBox) {
        // hold which shape is currently clicked
        currentShape = index;

        // set offset (distance between center of shape and cursor)
        xOffset = p5.mouseX - shape.position.x;
        yOffset = p5.mouseY - shape.position.y;

        store.dispatch(selectChunk({
          id: shape.id,
          frequency: shape.frequency
        }));
        return true;
      } else {
        return false;
      }
    });

    if (!locked && store.getState().appState) {
      store.dispatch(selectChunk({}));
    }
  };


  p5.mouseDragged = () => {
    if (locked) {
      // update selected shape position
      shapes[currentShape].position.x = p5.mouseX - xOffset;
      shapes[currentShape].position.y = p5.mouseY - yOffset;
    }
  };


  p5.mouseReleased = () => {
    locked = false;
  };
};

export default sketch;
