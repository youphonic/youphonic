import Chunk from './Chunk';

export default class Rectangle extends Chunk {
  constructor(p5, x, y, w, h) {
    super(p5, x, y);
    this.width = w;
    this.height = h || w;
    this.shape = 'rect';
    this.direction = p5.createVector(0, 0);
    this.boundaries = {
      left: x - w,
      right: x + w,
      top: y + h,
      bottom: y - h
    };
    this.collideRectCircle = (cx, cy, diameter) => {
      return p5.collideRectCircle(x, y, w, h, cx, cy, diameter);
    };
  }

  get arguments() {
    return [
      this.position.x,
      this.position.y,
      this.width,
      this.height
    ];
  }

  get bound() {
    return this.boundaries;
  }
}
