import Chunk from './Chunk';

export default class Rectangle extends Chunk {
  constructor(p5, x, y, w, h) {
    super(p5, x, y);
    this.width = w;
    this.height = h || w;
    this.shape = 'rect';
    this.direction = p5.createVector(0, 0);
    this.boundaries = {
      upperLeft: { x: (x - w), y: (y + h)},
      upperRight: { x: (x + w), y: (y + h)},
      lowerLeft: { x: (x - w), y: (y - h)},
      lowerRight: { x: (x + w), y: (y - h)}
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

  get boundaries () {
    return this.boundaries;
  }
}
