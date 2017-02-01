import Chunk from './Chunk';
import paper from 'paper'

export default class Attractor extends Chunk {
  constructor(x, y, radius, color, direction = new Point(0, 0), G = 1) {
    super(direction, color);
    this.radius = radius;
    this.G = G;
    this.path = new Path.Circle({
      center: [x, y],
      radius: radius,
      fillColor: color,
    });

    // this.type is temporary!
    this.type = 'attractor';
  }

  calculateAttraction(chunk) {
    // Calculate direction of force
    let force = this.path.position.subtract(chunk.path.position);
    // Distance between objects
    let distance = force.length;
    // Limiting the distance to eliminate "extreme" results for very close or very far objects
    distance = this.constrain(distance, 5, 25);
    // Normalize vector for extreme values
    force = force.normalize();
    // Calculate gravitional force magnitude
    const strength = (this.G * this.radius * chunk.radius) / (distance * distance);
    // Get force vector --> magnitude * direction
    force.multiply(strength);
    return force;
  }

  constrain(value, min, max) {
    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    } else {
      return value;
    }
  }
}
