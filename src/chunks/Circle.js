import Chunk from './Chunk';
import paper from 'paper'


export default class Circle extends Chunk {
  constructor(x, y, radius, direction) {
    super(x, y, direction);
    this.radius = radius;
    this.shape = 'ellipse';
    this.path = new Path.Circle({
      center: [x, y],
      radius: radius,
      fillColor: 'white',
    })
  }

  get arguments() {
    return [
      this.position.x,
      this.position.y,
      this.radius
    ];
  }
}
