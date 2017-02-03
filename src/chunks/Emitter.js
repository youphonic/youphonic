import Chunk from './Chunk'
import Circle from './Circle'

import colors from '../colors'

import { rhombusGenerator } from './shapeGenerators';
import { shapes } from '../paper';

export default class Emitter extends Chunk {
  constructor(x, y, length, color = 'white') {
    super(new Point(0, 0), color);
    this.path = emitterShapeGen(x, y, length);
    this.type = 'emitter';
    this.length = length;
    this.emitDirection = new Point(0, -3);
    // Animation/emitting variables:
    this.homePosition = new Point(this.path.position.x, this.path.position.y)
    this.isEmitting = false;
    // timing of emit events
    this.emitCycle = 1.0;
    this.currentEmitCycleStartTime = 0;
    // so things bounce off emitter and will not disappear
    this.fixed = true;
  }

  emit() {
    // could be streamlined to appear that chunk actually comes from emitter
    // currently skips some space but if it doesnt, it triggers an intersect detection in
    // main paper draw loop which destroys the particle
    let particle = new Circle(this.path.position.x, this.path.position.y - (this.length * 1.3), 10, this.emitDirection);
    shapes.push(particle);
  }

  // current 'jiggle' animation can be altered in the future
  animate() {
    // this.path.position.x += Math.random() * .5 - .25;
    this.path.position.y += Math.random() * 2 - 0.75;
  }

  update(time) {
    if (time >= this.emitCycle + this.currentEmitCycleStartTime) {
      this.currentEmitCycleStartTime = time;
      this.emit();
    }
    if (time <= this.emitCycle/2 + this.currentEmitCycleStartTime) {
      this.animate();
    } else {
      // this might be inefficient - we are recentering on every non animation frame
      this.path.position = this.homePosition;
    }
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