import Tone from 'tone';

import {bounce, reBounce, paperBounce, movingBounceOffFixed} from './utils'

let idCount = 1;

export default class Chunk {
  constructor(direction, color = 'white') {
	  this.id = idCount++;
    this.direction = direction
    this.color = color;
    this.shadowColor = '';
    this.fixed = false;
    this.flashColor = '';
  }

  get isMoving () {
    return !(this.direction.x === 0 && this.direction.y === 0)
  }

  update() {
    if (this.isMoving) {
      // window edge bounce dynamic
      if (this.path.position.x < 0 || this.path.position.x > window.innerWidth) this.direction.x *= -1;
      if (this.path.position.y < 0 || this.path.position.y > window.innerHeight) this.direction.y *= -1;
      // move Chunk in its direction
      this.path.position = this.path.position.add(this.direction)
    }
  }

  respondToHit(hitter) {
    if (hitter.fixed) {
      movingBounceOffFixed(this, hitter);
    } else {
      paperBounce(this, hitter);
    }
    hitter.flash();
    return this;
  }

  flash() {
    this.path.fillColor = this.flashColor;
    let that = this;
    setTimeout(function() {
      that.path.fillColor = that.color;
    }, 20)
  }

  drawVector() {
    if (!this.isMoving) return;
    let centerPoint = this.path.position;
    let direction = this.direction;
    let startPoint = centerPoint.add(direction.normalize(this.radius));
    let end = startPoint.add(direction.multiply(25))
    this.vectorItem = new Group([
      new Path([startPoint, end]),
      new Path([
        end.add(direction.multiply(2).rotate(160)),
        end,
        end.add(direction.multiply(2).rotate(-160))
      ])
    ]);
    this.vectorItem.strokeWidth = 2.0;
	  this.vectorItem.strokeColor = '#e4141b';
  }

  eraseVector() {
    if (this.vectorItem) {
      this.vectorItem.remove();
      this.vectorItem = null;
    }
  }
}
