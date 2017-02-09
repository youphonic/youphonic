import Circle from './Circle';

const forces = {
  wind1: {x: 0.01, y: 0},
  wind2: {x: -0.01, y: 0},
  gravity: {x: 0, y: 0.5}
};


export default class PhysBall extends Circle {
  constructor(x, y, radius, direction, color) {
    super(x, y, radius, direction, color);
    this.type = 'physics';
  }

  update() {
    this.applyForce(new Point(forces.gravity.x, forces.gravity.y));
  }
}
