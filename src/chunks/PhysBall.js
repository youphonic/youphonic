import Chunk from './Chunk';


export default class PhysBall extends Chunk {
  constructor(x, y, radius, color, direction, acceleration) {
    super(direction, color, acceleration);
    this.radius = radius;
    this.path = new Path.Circle({
      center: [x, y],
      radius: radius,
      fillColor: color,
    });

    // this.type is temporary!
    this.type = 'physics';
  }
}
