import { ourP5 } from '../components/P5Wrapper'

var idCount = 1;

export default class Chunk {
  constructor(x, y, direction = ourP5.createVector(0, 0)) {
    this.position = ourP5.createVector(x, y);
	  this.id = idCount++;
    this.direction = direction;
    // this is hacky for now - will be tied to Tone events eventually?
    this.color = [255, 255, 255]
    this.hitColor = [103, 103, 103];
    this.hitCount = 0;
    this.hit = false;
  }

  get isMoving () {
    return (this.direction.x !== 0 && this.direction.y !== 0)
  }
}
