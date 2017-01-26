import Chunk from './Chunk';

export default class Circle extends Chunk {
  constructor(p5, x, y, radius) {
    super(p5, x, y);
    this.radius = radius;
    this.shape = 'ellipse';
    this.direction = p5.createVector(Math.random() * 4 - 2, Math.random() * 4 - 2);
  }

  get arguments() {
    return [
      this.position.x,
      this.position.y,
      this.radius
    ];
  }
}
