// import { ourP5 } from '../components/P5Wrapper'

var idCount = 1;

let initialDirection = {
  x: 0,
  y: 0
}

export default class Chunk {
  constructor(x, y, direction = initialDirection) {
    this.position = [x, y]
	  this.id = idCount++;
    this.direction = direction;
    // this is hacky for now - will be tied to Tone events eventually?
    this.color = [255, 255, 255]
    this.hitColor = [225, 139, 115];
    this.hitCount = 0;
    this.hit = false;
  }

  get isMoving () {
    return !(this.direction.x === 0 && this.direction.y === 0)
  }
}
