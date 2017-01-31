import Chunk from './Chunk';

export default class Rectangle extends Chunk {
  constructor(x, y, w, h, direction) {
    super(direction);
    this.width = w;
    this.height = h || w;
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
