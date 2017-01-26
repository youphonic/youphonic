// import p5 from 'p5'

// this may be replaced by a global p5 instance
// let currentp5 = new p5()

var idCount = 1;

export default class Chunk {
  constructor(p5, x, y) {
    this.p5 = p5;
    this.position = this.p5.createVector(x, y);
	this.id = idCount++;
  }
}
