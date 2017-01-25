import p5 from 'p5'

// this may be replaced by a global p5 instance
let currentp5 = new p5()

export default class Chunk {
  constructor(x, y) {
    this.position = currentp5.createVector(x, y)
  }
}