import Chunk from './Chunk';


export default class Circle extends Chunk {
  constructor(x, y, radius, direction) {
    super(x, y, direction);
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
