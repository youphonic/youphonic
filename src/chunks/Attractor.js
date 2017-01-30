/*eslint-disable id-length */
import p5 from 'p5';
import Chunk from './Chunk';
import { ourP5 } from '../components/P5Wrapper';


export default class Attractor extends Chunk {
  constructor(x = 0, y = 0, radius = 1) {
    super(x, y);
    // radius also represents mass for the physics equations
    this.radius = radius;
    // this is temporary -- to not conflict with existing coded
    this.shape = false;
  }


  applyForce() {
  }


  update() {
  }


  display() {
  }


  checkEdges() {
  }
}
