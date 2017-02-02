import Chunk from './Chunk';
import Circle from './Circle';
import colors from '../colors'


export default class Springer extends Circle {
  constructor(x, y, radius, direction = new Point(0, 0), len, color = colors.newYorkPink) {
    super(x, y, radius, direction, color);
    this.k = 0.2;
    this.restLength = len;
    this.anchorPoint = new Point(x, y - len);

    // this draws the spring between the anchorPoint and
    // the center of this.path
    this.spring = new Path([this.path.position, this.anchorPoint])

    this.group = new Group([this.spring, this.path]);
    this.group.strokeColor = color;

    this.type = 'springer';
  }

  // Calculate and apply spring force
  connect() {
    // Vector pointing from anchor to bob location
    let force = p5.Vector.sub(this.path.position, this.anchor);
    // What is distance
    let dist = force.length;
    // Stretch is difference between current distance and rest length
    let stretch = dist - this.restLength;

    // Calculate force according to Hooke's Law
    // F = k * stretch
    force = force.normalize();
    force = force.multiply(-1 * this.k * stretch);

    this.applyForce(force);
  }

  constrainLength(minLength, maxLength) {
    let dir = this.path.position.subtract(this.anchor);
    let d = dir.length;
    // Is it too short?
    if (d < minLength) {
      dir = dir.normalize();
      dir = dir.multiply(minLength);
      // Reset location and stop from moving (not realistic physics)
      this.path.position = this.anchor.add(dir);
      this.direction = this.direction.multiply(0);
      // Is it too long?
    } else if (d > maxLength) {
      dir = dir.normalize();
      dir = dir.multiply(maxLength);
      // Reset location and stop from moving (not realistic physics)
      this.path.position = this.anchor.add(dir);
      this.direction = this.direction.multiply(0);
    }
  }

  specialUpdate() {
    if (!this.isMoving) return;
    let endPoint = this.path.position;
    this.spring = new Path([endPoint, this.anchorPoint]);

    // the following is the logic from this.update();
    // this.direction = this.direction.add(this.acceleration);
    // this.direction = this.direction.mult(this.damping);
    // this.position = this.position.add(this.direction);
    // this.acceleration = this.acceleration.multiply(0);

  }
}
