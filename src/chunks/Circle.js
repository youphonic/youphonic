/* globals Path  */

import Chunk from './Chunk';

export default class Circle extends Chunk {
  constructor(x, y, radius, direction, color = 'white') {
    super(direction, color);
    this.radius = radius;
    this.path = new Path.Circle({
      center: [x, y],
      radius: radius,
      fillColor: color,
    })
  }
}
