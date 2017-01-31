import Chunk from './Chunk';
import paper from 'paper'


export default class PhysBall extends Chunk {
  constructor(x, y, radius, direction) {
    super(direction);
    this.radius = radius;
    this.acceleration = new Point(0, 0);
    this.path = new Path.Circle({
      center: [x, y],
      radius: radius,
      fillColor: 'blue',
    });
    // this.type is temporary!
    this.type = 'physics';
  }

  applyForce(force) {
    const f = force.divide(this.radius / 10);
    this.acceleration = this.acceleration.add(f);
  }

  phupdate() {
    this.direction = this.direction.add(this.acceleration);
    this.path.position = this.path.position.add(this.direction);
    this.acceleration = this.acceleration.multiply(0);
  }
}
