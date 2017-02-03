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
    this.type = 'pendulum';
    this.strRad = strRad;
    this.anchorPoint = new Point(x, y - strRad);
    this.pendulum = new Path([this.anchorPoint, this.path.position]);
    this.pendulum.strokeColor = colors.chinook;
    this.fixed = true;
    this.rotation = 2;
  }

  specialUpdate () {
    this.erasePendulum();

    if (this.angle > 0) {
      this.rotation = this.rotation * -1;
    }
    this.path.position = this.path.position.rotate(this.rotation, this.anchorPoint);

    this.drawPendulum();
  }

  drawPendulum () {
    this.pendulum = new Path([this.anchorPoint, this.path.position]);
    this.pendulum.strokeColor = colors.chinook;
  }

  erasePendulum () {
    if (this.pendulum) {
      this.pendulum.remove();
      this.pendulum = null;
    }
  }

  get angle () {
    return this.anchorPoint.subtract(this.path.position).angle;
  }
}
