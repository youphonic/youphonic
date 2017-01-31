import {bounce, reBounce, paperBounce} from './utils'

let idCount = 1;

export default class Chunk {
  constructor(direction) {
	  this.id = idCount++;
    this.direction = direction
    this.color = '';
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
    paperBounce(this, hitter)
    // let newAngle = bounce(this.path.position, hitter.path.position, this.direction)
    // this.direction.angle += newAngle;
    return this;
  }
}
