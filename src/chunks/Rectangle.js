import Chunk from './Chunk';

export default class Rectangle extends Chunk {
  constructor(x, y, w, h, direction) {
    super(x, y, direction);
    this.width = w;
    this.height = h || w;
    this.shape = 'rect';
    // this.collideRectCircle = (cx, cy, diameter) => {
    //   return p5.collideRectCircle(x, y, w, h, cx, cy, diameter);
    // };
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
    return {
      left: this.x - this.width,
      right: this.x + this.width,
      top: this.y + this.height,
      bottom: this.y - this.height
    }
  }

}
