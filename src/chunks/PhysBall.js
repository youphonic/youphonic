import Circle from './Circle';


export default class PhysBall extends Circle {
  constructor(x, y, radius, direction, color) {
    super(x, y, radius, direction, color);
    this.type = 'physics';
  }
}
