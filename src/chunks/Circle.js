import Chunk from './Chunk';


export default class Circle extends Chunk {
  constructor(x, y, radius, velocity) {
    super(x, y, velocity);
    this.radius = radius;
    this.shape = 'ellipse';
  }

  get arguments() {
    return [
      this.position.x,
      this.position.y,
      this.radius
    ];
  }
}
