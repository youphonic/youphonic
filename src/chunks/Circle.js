import Chunk from './Chunk';
import colors from '../colors';
import { player, drumBuffers, possibilities } from '../tone/drums';
import { synthOne, synthTwo } from '../tone/tonePatchOne';

export default class Circle extends Chunk {
  constructor(x, y, radius, direction, color = colors.papayaWhip) {
    super(direction, color);
    this.radius = radius;
    this.path = new Path.Circle({
      center: [x, y],
      radius: radius,
      fillColor: color,
      shadowColor: colors.blueStone,
      shadowBlur: 25,
      shadowOffset: new Point(3, 5)
    });
    this.type = 'circle';
    this.triggerSynthResponse = true;
  }

  // update is called in main draw loop
  // circles do not need to do any updating
  update() {
    return;
  }
}
