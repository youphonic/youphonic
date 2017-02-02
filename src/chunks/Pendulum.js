import Chunk from './Chunk';
import {chinook} from '../colors';

export default class Pendulum extends Chunk {
  constructor(x, y, radius, direction, color = chinook) {
    super(direction, color);
    this.radius = radius;
    this.path = new Path.Circle({
      center: [x, y],
      radius: radius,
      fillColor: color,
    })
  }
}
