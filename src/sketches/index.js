export default function sketch (p) {
  // array to hold current canvas shapes
  let shapes = [];
  let playing;

  // keep track of mouse position relative to a box
  var isOverChunk = false;
  // whether canvas is 'allowing' other mouse actions
  var locked = false;

  // will hold center of canvas
  var bx, by;
  // keep track of distance between center of shape and the place clicked
  var xOffset, yOffset;


  p.windowResized = function() {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
  }

  p.setup = function() {
    // set width and height of canvas on init
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    shapes = props.allChunks;
    if (props.isPlaying) {
      p.loop();
    } else {
      p.noLoop();
    }
  };

  p.draw = function () {
    // create background
    p.background(100);
    // set stroke color
    p.stroke(0, 153, 255);
    // set fill color of shapes
    p.fill(255, 55, 155);
    // draw all shapes in the array with its arguments
    shapes.forEach(shape => p[shape.shape](...shape.arguments));
    // update shape position
    shapes = shapes.map(shape => {
      shape.position = shape.position.add(shape.direction);
      // add bounce dynamic to edges
      if (shape.position.y < (0 - p.height / 2) || shape.position.y > p.height / 2) {
       shape.direction.y *= -1
      }
      if (shape.position.x < (0 - p.width / 2) || shape.position.x > p.width / 2) {
        shape.direction.x *= -1
      }
      return shape;
    });
  };

  function mousePressed() {
    // lock screen if any are clicked
    locked = shapes.some((shape, index) => {
      if(shape.overBox) {
        // hold which shape is currently clicked
        currentShape = index;
        // set offset (distance between center of shape and cursor)
        xOffset = mouseX-shape.x;
        yOffset = mouseY-shape.y;
        return true;
      } else {
        return false
      }
    })
  }

  function mouseDragged() {
  if(locked) {
    // update selected shape position
    shapes[currentShape].x = mouseX-xOffset;
    shapes[currentShape].y = mouseY-yOffset;
  }
}
}
