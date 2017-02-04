import Tone from 'tone';

import {movingBounceOffMoving, movingBounceOffFixed, movingCircleBounceOffRectangle, drawArrow, drawAlignment} from './utils'

// auto incrementing id
let idCount = 1;

export default class Chunk {
  constructor(direction, color = 'white', acceleration = new Point(0, 0)) {
	  this.id = idCount++;
    this.direction = direction
    this.color = color;
    this.shadowColor = '';
    this.fixed = false;
    this.flashColor = '';
    this.acceleration = acceleration;
    this.aligned = false;
  }

  get isMoving () {
    return !(this.direction.x === 0 && this.direction.y === 0)
  }

  applyForce(force) {
    // using this.radius to represent mass
    // maybe add a this.mass property in the future?
    const f = force.divide(this.radius);
    this.acceleration = this.acceleration.add(f);
  }

  update() {
    if (this.specialUpdate) {
      this.specialUpdate();
    }
    if (this.isMoving) {
      // window edge bounce dynamic
      if (this.path.position.x < 0 || this.path.position.x > window.innerWidth) this.direction.x *= -1;
      if (this.path.position.y < 0 || this.path.position.y > window.innerHeight) this.direction.y *= -1;
      // apply Newtons's second law: A = F/M
      this.direction = this.direction.add(this.acceleration);
      // move Chunk in its direction
      this.path.position = this.path.position.add(this.direction);
      //reset the acceleration after each frame
      this.acceleration = this.acceleration.multiply(0);
    }
  }

  respondToHit(hitter) {
    if(hitter.type === 'rectangle') {
      movingCircleBounceOffRectangle(this, hitter)
    } else if (hitter.fixed) {
      movingBounceOffFixed(this, hitter);
    } else {
      movingBounceOffMoving(this, hitter);
    }
    hitter.flash();
    return this;
  }

  flash() {
    if (this.flashColor){
      this.path.fillColor = this.flashColor;
      let that = this;
      setTimeout(function() {
        that.path.fillColor = that.color;
      }, 20)
    }
  }

  drawVector() {
    if (!this.isMoving) return;
    let endPoint = this.path.position.add(this.direction.multiply(15));
    this.vectorItem = drawArrow(this.path.position, endPoint, this.direction)
  }

  dragVector(mousePoint, shiftPressed) {
    this.eraseVector();
    // let startPoint = this.path.position.add(this.direction.normalize(this.radius));
    let angle = this.path.position.getAngle(mousePoint);
    if (shiftPressed && Math.round(angle) % 45 === 0) {
      this.vectorItem = drawArrow(this.path.position, mousePoint, this.direction);
      this.direction = (this.path.position.subtract(mousePoint)).divide(-15);
    } else if (!shiftPressed) {
      this.vectorItem = drawArrow(this.path.position, mousePoint, this.direction);
      this.direction = (this.path.position.subtract(mousePoint)).divide(-15);
    }
  }

  eraseVector() {
    if (this.vectorItem) {
      this.vectorItem.remove();
      this.vectorItem = null;
    }
  }

  drawAlignment() {
    if (!this.aligned) return; 
    this.centerAlignment = drawAlignment(this.path.position);
  }

  dragAlignment(mousePoint, shiftPressed) {
    this.eraseAlignment();
    this.centerAlignment = drawArrow(this.path.position);
  }

  eraseAlignment() {
    if (this.centerAlignment) {
      this.centerAlignment.remove();
      this.centerAlignment = null;
    }
  }
}
