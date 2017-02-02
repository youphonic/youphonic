import paper from 'paper';

import Circle from './Circle';
import { constrain } from './utils';

export default class Attractor extends Circle {
  constructor(x, y, radius, direction, color, fixed, G = 1) {
    super(x, y, radius, direction, color);
    this.G = G;
    this.fixed = fixed;
    this.type = 'attractor';
  }

  calculateAttraction(chunk) {
    // Calculate direction of force
    let force = this.path.position.subtract(chunk.path.position);
    // Distance between objects
    let distance = force.length;
    // Limiting the distance to eliminate "extreme" results for very close or very far objects
    distance = constrain(distance, 5, 25);
    // Normalize vector for extreme values
    force = force.normalize();
    // Calculate gravitional force magnitude
    const strength = (this.G * this.radius * chunk.radius) / (distance * distance);
    // Get force vector --> magnitude * direction
    force.multiply(strength);
    return force;
  }
}
