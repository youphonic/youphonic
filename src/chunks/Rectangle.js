/* globals Path Point Size */

import Chunk from './Chunk';

export default class Rectangle extends Chunk {
  constructor(x, y, w, h, direction = new Point(0, 0), color = 'white') {
    super(direction, color);
    this.type = 'rectangle';
    this.width = w;
    this.height = h;
    this.path = new Path.Rectangle(new Point(x, y), new Size(this.width, this.height));
    this.path.fillColor = color;
    this.center = [x + (this.width / 2), y + (this.height / 2)];
    this.fixed = true;
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
