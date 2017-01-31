import Chunk from './Chunk';
import paper from 'paper'


export default class Circle extends Chunk {
  constructor(x, y, radius, direction) {
    super(direction);
    this.radius = radius;
    this.path = new Path.Circle({
      center: [x, y],
      radius: radius,
      fillColor: 'white',
    })
  }
}
