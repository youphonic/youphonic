
export default function sketch (p) {
  // array to hold current canvas shapes
  let shapes = [];
  let playing;

  // keep track of mouse position relative to a box
  var isOverChunk = false;
  // whether canvas is 'allowing' other mouse actions
  var locked = false;

  var currentShape = 0;

  // will hold center of canvas
  var bx = 0, by = 0;
  // keep track of distance between center of shape and the place clicked
  var xOffset, yOffset;

  var mouseOffsetConstX = -(window.innerWidth / 2);
  var mouseOffsetConstY = -(window.innerHeight / 2)


  p.windowResized = function() {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
  }

  p.setup = function() {
    // set width and height of canvas on init
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.rectMode(p.RADIUS);
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
        // add bounce dynamic to edges
        if (shape.position.y < (0 - p.height / 2) || shape.position.y > p.height / 2) {
        shape.direction.y *= -1
        }
        if (shape.position.x < (0 - p.width / 2) || shape.position.x > p.width / 2) {
          shape.direction.x *= -1
        }
      }
      // draw the shape
      p.stroke(40, 30, 255);
      p.fill(244, 244, 244)
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
