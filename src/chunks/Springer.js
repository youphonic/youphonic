import Chunk from './Chunk';
import Circle from './Circle';

export default class Springer extends Chunk {
  constructor(x, y, len, direction = new Point(0, 0)) {
    super(direction);
    this.k = 0.2;
    this.restLength = len;
    this.anchor = new Point(x, y);
    this.chunk = new Circle(x, y + len, 20, new Point(0, 0));

    // this draws the spring between the anchor and
    // the center of this.chunk
    this.path = new Path([this.chunk.path.position, this.anchor])

    // this.type is temporary!
    this.type = 'springer';
  }

  connect() {
    // Vector pointing from anchor to bob location
    let force = this.chunk.path.position.subtract(this.anchor);
    // What is distance
    const distance = force.length;
    // Stretch is difference between current distance and rest length
    const stretch = distance - this.restLength;

    // Calculate force according to Hooke's Law
    // F = k * stretch
    force = force.normalize();
    force = force.multiply(-1 * this.k * stretch);
    this.chunk.applyForce(force);
  }

  constrainLength(minLen, maxLen) {
    let dir = this.chunk.path.position.subtract(this.anchor);
    let dist = dir.length;

    // Is it too short?
    if (dist < minLength) {
      dir = dir.normalize();
      dir = dir.multiply(minLength);
      // Reset location and stop from moving (not realistic physics)
      this.chunk.path.position = this.anchor.add(dir);
      this.chunk.direction.multiply(0);
      // Is it too long?
    } else if (dist > maxLength) {
      dir = dir.normalize();
      dir = dir.multiply(maxLength);
      // Reset location and stop from moving (not realistic physics)
      this.chunk.path.position = p5.Vector.add(this.anchor, dir);
      this.chunk.direction.multiply(0);
    }
  }
}
