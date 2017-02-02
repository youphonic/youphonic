/* globals Path Point Size */

import Chunk from './Chunk';

export default class Rectangle extends Chunk {
  constructor(x, y, w, h, direction, color = 'white') {
    super(direction, color);
    this.width = w;
    this.height = h || w;
    this.path = new Path.Rectangle(new Point(x, y), new Size(this.width, this.height));
    this.path.applyMatrix = false;
    this.path.fillColor = color;
    this.radius = (this.width + this.height) / 2;
    this.type = 'rectangle'
  }

  get bound() {
    return {
      left: this.x - this.width,
      right: this.x + this.width,
      top: this.y + this.height,
      bottom: this.y - this.height
    }
  }

  get center() {
    return new Point(this.path.position + (this.width / 2), this.path.position + (this.height / 2));
  }

}
