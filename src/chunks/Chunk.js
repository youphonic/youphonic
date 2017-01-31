import {bounce, reBounce} from './utils'

let idCount = 1;

// const initialDirection = new Point(0, 0)

export default class Chunk {
  constructor(x, y, direction) {
    this.position = [x, y]
	  this.id = idCount++;
    this.direction = direction
    // this is hacky for now - will be tied to Tone events eventually?
    this.color = [255, 255, 255]
    this.hitColor = [225, 139, 115];
    this.hitCount = 0;
    this.hit = false;
  }

  get isMoving () {
    return !(this.direction.x === 0 && this.direction.y === 0)
  }

  update() {
    if (this.isMoving) {
      // move Chunk in its direction
      this.path.position = this.path.position.add(this.direction)
      // bounce dynamic
      if (this.path.position.x < 0 || this.path.position.x > window.innerWidth) this.direction.x *= -1;
      if (this.path.position.y < 0 || this.path.position.y > window.innerHeight) this.direction.y *= -1;
    }
  }

  respondToHit(hitter) {
    let newAngle = bounce(this.path.position, hitter.path.position, this.direction)
    this.direction.angle += newAngle;
    return this;
  }
}
