import Circle from './Circle';


export default class Drone extends Circle {
  constructor(x, y, radius, direction, color) {
    super(x, y, radius, direction, color);
    this.type = 'drone';
  }
}
