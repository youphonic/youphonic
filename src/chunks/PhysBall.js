/*eslint-disable id-length */
import p5 from 'p5';
import Chunk from './Chunk';
import { ourP5 } from '../components/P5Wrapper';


export default class PhysBall extends Chunk {
  constructor(x = 0, y = 0, radius = 30, velocity) {
    super(x, y, velocity);
    // radius also represents mass * 10 for the physics equations
    this.radius = radius;
    this.acceleration = ourP5.createVector(0, 0);
    // this is temporary -- to not conflict with existing coded
    this.shape = false;
    this.type = 'PhysBall';
  }


  applyForce(force) {
    const f = p5.Vector.div(force, this.radius / 10);
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
    ourP5.ellipse(this.position.x, this.position.y, this.radius, this.radius);
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

  get arguments() {
    return [
      this.position.x,
      this.position.y,
      this.radius
    ];
  }
}
