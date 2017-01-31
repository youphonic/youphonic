import {bounce, reBounce, paperBounce} from './utils'

let idCount = 1;

export default class Chunk {
  constructor(direction, acceleration = new Point(0, 0)) {
	  this.id = idCount++;
    this.direction = direction;
    this.acceleration = acceleration;
    this.color = '';
  }

  get isMoving () {
    return !(this.direction.x === 0 && this.direction.y === 0)
  }

  applyForce(force) {
    // using this.radius to represent mass
    // maybe add a this.mass property in the future?
    const f = force.divide(this.radius / 10);
    this.acceleration = this.acceleration.add(f);
  }

  update() {
    if (this.isMoving) {
      // bounce dynamic
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
    paperBounce(this, hitter)
    return this;
  }
}
