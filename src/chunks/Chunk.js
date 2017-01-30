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
      this.path.position = this.path.position.add(this.direction)

      // console.log(Math.floor(this.path.position.x), Math.floor(this.path.position.y));
    }
  }

  respondToHit(hitter) {
    // this.direction.angle -= bounce(this.path.position, hitter.path.position, this.direction)
    // console.log('before', this.direction);
    // console.log('before', hitter.direction);
    reBounce(this, hitter)
    console.log(this.direction, hitter.direction);
    console.log(this.path, hitter.path);
    // this.path.position.x -=100;
  }
}
