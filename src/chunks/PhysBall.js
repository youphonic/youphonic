/*eslint-disable id-length */
import p5 from 'p5';
import Chunk from './Chunk';
import { ourP5 } from '../components/P5Wrapper';


export default class PhysBall extends Chunk {
  constructor(x = 0, y = 0, radius = 1, velocity) {
    super(x, y, velocity);
    this.radius = radius;
    this.acceleration = ourP5.createVector(0, 0);
    // this is temporary -- to not conflict with existing coded
    this.shape = false;
  }


  applyForce(force) {
    const f = p5.Vector.div(force, this.radius);
    this.acceleration.add(f);
  }


  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }


  display() {
    ourP5.stroke(49, 184, 181);
    ourP5.fill(255, 240, 213);
    ourP5.strokeWeight(2);
    ourP5.ellipse(this.position.x, this.position.y, 48, 48);
  }


  checkEdges() {
    if (this.position.x > ourP5.width / 2) {
      this.velocity.x *= -1;
      this.position.x = ourP5.width / 2;
    } else if (this.position.x < 0 - ourP5.width / 2) {
      this.position.x = 0 - ourP5.width / 2;
      this.velocity.x *= -1;
    }
    if (this.position.y > ourP5.height / 2) {
      this.velocity.y *= -1;
      this.position.y = ourP5.height / 2;
    }
  }
}
