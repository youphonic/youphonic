import Chunk from './Chunk';
import paper from 'paper'


export default class PhysBall extends Chunk {
  constructor(x, y, radius, direction, acceleration) {
    super(direction, acceleration);
    this.radius = radius;
    this.path = new Path.Circle({
      center: [x, y],
      radius: radius,
      fillColor: 'blue',
    });

    // this.type is temporary!
    this.type = 'physics';
  }
}
