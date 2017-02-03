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
  var rhombus1 = rhombusGenerator(x, y, length, Math.PI / 4, colors.flamingo);
  var rhombus2 = rhombusGenerator(x, y, length, Math.PI / 4, colors.chinook);
  rhombus1.rotate(90);
  rhombus2.rotate(45);
  rhombus2.position.x -= (Math.cos(Math.PI / 4) * length);
  var square = new Path.Rectangle(new Point(x, y), new Size(length, length));
  square.fillColor = colors.papayaWhip
  square.position.y -= length
  square.rotate(-45);
  return new Group([rhombus1, rhombus2, square]);
}