


export default function sketch (p) {
  // array to hold current canvas shapes
  let shapes = [];
  let playing;

  // keep track of mouse position relative to a box
  var isOverChunk = false;
  // whether canvas is 'allowing' other mouse actions
  var locked = false;

  // hold index of currently 'clicked' Chunk
  var currentShape = 0;

  // will hold center of canvas
  var bx = 0, by = 0;
  // keep track of distance between center of shape and the place clicked
  var xOffset, yOffset;

  // constant - offset mouse (mouse origin is upper left, canvas origin is center of canvas for some god-forsaken reason)
  var mouseOffsetConstX = -(window.innerWidth / 2);
  var mouseOffsetConstY = -(window.innerHeight / 2)

  // resize canvas on window resize
  p.windowResized = function() {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.rectMode(p.RADIUS);
    p.ellipseMode(p.RADIUS);
    p.angleMode(p.RADIANS);
  }

  // set width and height of canvas on init
  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    // magic function - all future rectangle instances will be drawn from center point with 'radius',
    // i.e. 3rd arg is 1/2l and 4th arg is 1/2w
    p.rectMode(p.RADIUS);
    p.ellipseMode(p.RADIUS);
    p.angleMode(p.RADIANS);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    shapes = [...props.allChunks];
    if (props.isPlaying) {
      playing = true;
    } else {
      playing = false;
    }
  };

  p.draw = function () {
    // create background
    p.background(19, 72, 71);
    // set stroke color
    p.stroke(0, 153, 255);
    // set fill color of shapes
    p.fill(255, 55, 155);
    // draw all shapes in the array with its arguments
    // shapes.forEach(shape => p[shape.shape](...shape.arguments));
    // update shape position
    shapes = shapes.map(shape => {
      // basic check: is it enabled?
      if (!playing) {
        // check if mouse is in bounds of a Chunk
        if (  p.mouseX+mouseOffsetConstX > shape.position.x-shape.radius &&
              p.mouseX+mouseOffsetConstX < shape.position.x+shape.radius &&
              p.mouseY+mouseOffsetConstY > shape.position.y-shape.radius &&
              p.mouseY+mouseOffsetConstY < shape.position.y+shape.radius
        ) {
          shape.overBox = true;
        } else {
          shape.overBox = false;
        }
      // if playing, run the animation updates
      } else {
        shape.position = shape.position.add(shape.direction);
        // add bounce dynamic to edges of canvas
        if (shape.position.y < (0 - p.height / 2) || shape.position.y > p.height / 2) {
        shape.direction.y *= -1
        }
        if (shape.position.x < (0 - p.width / 2) || shape.position.x > p.width / 2) {
          shape.direction.x *= -1
        }
        // check for moving - stationary collisions
        if (!shape.isMoving) {
          let hit = shapes.some(movingShape => {
            if (movingShape.id === shape.id) return false;
            let collision = p.collideCircleCircle(movingShape.position.x, movingShape.position.y, (movingShape.radius * 2), shape.position.x, shape.position.y, (shape.radius * 2));
            // moving shape's response to hit
            if (collision) {
              movingShape.direction.x *= -1;
              movingShape.direction.y *= -1;
            }
            return collision
          })
          // stationary shape's response to hit
          if (hit) {
            shape.color = shape.hitColor;
            shape.hit = true;
            shape.hitCount = 60;
          }
        }

      }
      // draw the shape

      // this is hacky for now... should eventually be tied to Tone events
      if (shape.hitCount > 0 && shape.hit) shape.hitCount--
      else {
        shape.color = [255, 255, 255]
        shape.hit = false;
      }
      p.fill(...shape.color)

      p[shape.shape](...shape.arguments)
      // always return shape
      return shape;
    });
  };

  p.mousePressed = function() {
    // lock screen if any are clicked
    locked = shapes.some((shape, index) => {
      if(shape.overBox) {
        // hold which shape is currently clicked
        currentShape = index;
        // set offset (distance between center of shape and cursor)
        xOffset = p.mouseX-shape.position.x;
        yOffset = p.mouseY-shape.position.y;
        return true;
      } else {
        return false
      }
    })
  }

  p.mouseDragged = function() {
    if(locked) {
      // update selected shape position
      shapes[currentShape].position.x = p.mouseX-xOffset;
      shapes[currentShape].position.y = p.mouseY-yOffset;
    }
  }

  p.mouseReleased = function() {
    locked = false;
  }
}
