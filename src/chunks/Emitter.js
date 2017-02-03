import Chunk from './Chunk'

import colors from '../colors'

import { rhombusGenerator } from './shapeGenerators'

export default class Emitter extends Chunk {
  constructor(x, y, length, color = 'white') {
    super(new Point(0, 0), color);
    this.path = emitterShapeGen(x, y, length);
  }
}

// generate the basic emitter shape
function emitterShapeGen(x, y, length) {
  // build the two bottom rhombuses
  var rhombus1 = rhombusGenerator(x, y, length, Math.PI / 4, colors.flamingo);
  var rhombus2 = rhombusGenerator(x, y, length, Math.PI / 4, colors.chinook);
  // rotate and place them
  rhombus1.rotate(90);
  rhombus2.rotate(45);
  rhombus2.position.x -= (Math.cos(Math.PI / 4) * length);
  // originals will hold the boolean operation of a subtraction
  // must not be added to the DOM, but only saved after mutation
  var originals = new Group({ insert: false }); // do not insert into the DOM
  // create the top square to sit on the rhombuses
  var square = new Path.Rectangle(new Point(x, y), new Size(length, length));
  square.parent = originals;
  square.fillColor = colors.papayaWhip;
  // move it into position and rotate
  square.position.y -= length
  square.rotate(-45);
  // circle that will be subtracted from the emitter appearance
  var subtractCircle = new Path.Circle({
    // center the circle relative to the overall shape
    center: [x + length/2, y - length],
    // set the radius to be relative to the size of the emitter
    radius: length * 0.4,
    parent: originals
  });
  var innerSquare = square.subtract(subtractCircle);
  // group and return
  return new Group([rhombus1, rhombus2, innerSquare]);
}