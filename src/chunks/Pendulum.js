import Chunk from './Chunk';
import colors from '../colors';

export default class Pendulum extends Chunk {
  constructor(x, y, radius, direction, color = colors.chinook, strRad = 150) {
    super(direction, color);
    this.radius = radius;
    this.path = new Path.Circle({
      center: [x, y],
      radius: radius,
      fillColor: color,
    });
    this.strRad = strRad;
    this.anchorPoint = new Point(x, y - strRad);
    this.pendulum = new Path([this.anchorPoint, this.path.position]);
    this.pendulum.strokeColor = colors.chinook;
    this.fixed = true;
  }

  specialUpdate () {
    this.erasePendulum();
    this.drawPendulum();
  }

  drawPendulum () {
    this.path.position = this.path.position.rotate(1, this.anchorPoint);
    console.log('Path Position', this.path.position.subtract(this.anchorPoint));
    this.pendulum = new Path([this.anchorPoint, this.path.position]);
    this.pendulum.strokeColor = colors.chinook;
  }

  erasePendulum () {
    if (this.pendulum) {
      this.pendulum.remove();
      this.pendulum = null;
    }
  }
}
