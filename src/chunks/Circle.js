// import p5 from 'p5';
import Chunk from './Chunk';

// this may be replaced by a global p5 instance
// let currentp5 = new p5();

export default class Circle extends Chunk {
  constructor(p5, x, y, radius) {
    super(p5, x, y);
    this.radius = radius;
    this.shape = 'ellipse';
    this.direction = p5.createVector(-1, -1);
    // this.arguments = [
    //   this.position.x,
    //   this.position.y,
    //   this.radius
    // ];
  }

  get arguments() {
    return [
      this.position.x,
      this.position.y,
      this.radius
    ];
  }
}
