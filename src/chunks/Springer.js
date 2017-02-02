import Chunk from './Chunk';
import Circle from './Circle';
import colors from '../colors'


// class BallOnString {
//   constructor(x, y) {
//     this.radius = 24;
//     // Arbitrary damping to simulate friction / drag
//     this.damping = 0.98;
//     this.position = new Point(x,y);
//     this.direction = new Point(1, 0);
//     this.acceleration = new Point(0, 0);
//   }
// }


export default class Springer extends Chunk {
  constructor(x, y, len, direction = new Point(0, 0), color = colors.newYorkPink, acceleration) {
    super(direction, color, acceleration);
    this.k = 0.2;
    this.radius = 24;
    this.restLength = len;
    this.anchorPoint = new Point(x, y);
    this.ballOnString = new Path.Circle({
      center: [x, y + len],
      radius: this.radius,
      fillColor: color
    });

    // this draws the spring between the anchorPoint and
    // the center of this.ballOnString
    this.spring = new Path([this.ballOnString.position, this.anchorPoint])

    this.path = new Group([this.spring, this.ballOnString]);
    this.path.strokeColor = color;

    // this.type is temporary!
    this.type = 'springer';
  }

  connect() {
  }

  constrainLength(minLen, maxLen) {
  }

  updateSpringer() {
  }
}
