import { ourP5 } from '../components/P5Wrapper'

var idCount = 1;

export default class Chunk {
  constructor(x, y, velocity = ourP5.createVector(0, 0)) {
    this.position = ourP5.createVector(x, y);
	  this.id = idCount++;
    this.velocity = velocity;
    // this is hacky for now - will be tied to Tone events eventually?
    this.color = [255, 240, 213];
    this.hitColor = [18, 94, 104];
    this.hitCount = 0;
    this.hit = false;
  }

  get isMoving () {
    return !(this.velocity.x === 0 && this.velocity.y === 0)
  }
}
