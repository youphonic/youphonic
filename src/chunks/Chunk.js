import Tone from 'tone';

import {movingBounceOffMoving, movingBounceOffFixed, movingCircleBounceOffRectangle, drawArrow, drawAlignment} from './utils';
import { synthOne, synthTwo } from '../tone/tonePatchOne';
import { player, drumBuffers, possibilities } from '../tone/drums';

// auto incrementing id
let idCount = 1;

export default class Chunk {
  constructor(direction, color = 'white', acceleration = new Point(0, 0), rotation = 0) {
	  this.id = idCount++;
    this.direction = direction;
    this.color = color;
    this.shadowColor = '';
    this.flashColor = '';
    this.acceleration = acceleration;
    // will this Chunk trigger hit responses?
    this.causeHitResponse = true;
    // will this Chunk move in response to hits?
    this.fixed = false;
    // is the Chunk aligned with others on drag?
    this.xAligned = false;
    this.yAligned = false;
    this.rotation = rotation;
    this.frequency = 'C4';
    this.triggerSynthResponse = false;
  }

  get isMoving () {
    return !(this.direction.x === 0 && this.direction.y === 0);
  }

  applyForce(force) {
    // using this.radius to represent mass
    // maybe add a this.mass property in the future?
    const f = force.divide(this.radius);
    this.acceleration = this.acceleration.add(f);
  }

  move() {
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

  react(hitter) {
    // trigger synth and drum responses if necessary
    if (hitter.drum) {
      player.buffer = drumBuffers.get(hitter.drum);
      player.start();
    }
    if (hitter.triggerSynthResponse) {
      synthOne.triggerAttackRelease(hitter.frequency, '8n');
    }
  }

  respondToHit(hitter) {
    if (!hitter.causeHitResponse || this.type === 'photon') {
      return;
    } else if(hitter.type === 'rectangle') {
      movingCircleBounceOffRectangle(this, hitter);
    } else if (hitter.fixed) {
      movingBounceOffFixed(this, hitter);
    } else {
      movingBounceOffMoving(this, hitter);
    }
    hitter.flash();
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
    this.vectorItem = drawArrow(this.path.position, endPoint, this.direction);
  }

  dragVector(mousePoint, shiftPressed) {
    this.eraseVector();
    let angle = this.path.position.subtract(mousePoint).angle;
    let newAngle = angle;
    let end = mousePoint;

    if (shiftPressed) {
      newAngle = Math.round((Math.round(angle / 45) * 45));
      let newDirection = new Point({
        angle: newAngle,
        length: mousePoint.subtract(this.path.position).length
      });
      end = this.path.position.subtract(newDirection);
    }
    this.vectorItem = drawArrow(this.path.position, end, this.direction);
    this.direction = (this.path.position.subtract(end)).divide(-15);
  }

  eraseVector() {
    if (this.vectorItem) {
      this.vectorItem.remove();
      this.vectorItem = null;
    }
  }

  drawAlignment() {
    if (!this.xAligned && !this.yAligned) return;
    this.eraseAlignment();
    this.centerAlignment = drawAlignment(this.path.position, this.xAligned, this.yAligned);
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

  setRotation(angle) {
    this.path.rotate(this.rotation - angle);
    this.rotation = angle;
  }

  setInitialRotation(angle) {
    this.path.rotate(angle)
  }

  rotate(angle) {
    this.path.rotate(angle);
    this.rotation += angle;
  }

}
