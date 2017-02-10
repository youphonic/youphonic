/* globals Path Point Size */

import Chunk from './Chunk';
import colors from '../colors';

export default class Rectangle extends Chunk {
  constructor(x, y, w, h, direction = new Point(0, 0), color = colors.papayaWhip, rotation) {
    super(direction, color, rotation);
    this.type = 'rectangle';
    this.width = w;
    this.height = h;
    this.path = new Path.Rectangle(new Point(x, y), new Size(this.width, this.height));
    this.redrawPos = new Point(x, y);
    this.path.fillColor = color;
    this.center = [x + (this.width / 2), y + (this.height / 2)];
    this.fixed = true;
    this.triggerSynthResponse = false;
    //shadow
    this.path.shadowColor = colors.blueStone;
    this.path.shadowBlur = 20;
    this.path.shadowOffset = new Point(5, 7);
  }

  get bound() {
    return {
      left: this.x - this.width,
      right: this.x + this.width,
      top: this.y + this.height,
      bottom: this.y - this.height
    }
  }

  updateRedrawPos () {
    this.redrawPos = new Point(this.path.position.x - this.width / 2, this.path.position.y - this.height / 2);
  }

  update() {
    return;
  }

}
