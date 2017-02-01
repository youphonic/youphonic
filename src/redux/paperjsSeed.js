/*eslint-disable id-length */
import Circle from '../chunks/Circle';
import { addChunk } from './allChunks';
import store from '../store';
import colors from '../colors';

let center = store.getState().canvas.center;

export default function () {
  let xDiff = 250;
  let yDiff = 250;
  let radius = 60;

  let noMotion = new Point(0, 0)

  const circleSeed = [
    new Circle(center.x + xDiff, center.y + yDiff, radius, noMotion, colors.papayaWhip),
    new Circle(center.x - xDiff, center.y + yDiff, radius, noMotion, colors.papayaWhip),
    new Circle(center.x + xDiff, center.y - yDiff, radius, noMotion, colors.papayaWhip),
    new Circle(center.x - xDiff, center.y - yDiff, radius, noMotion, colors.papayaWhip),
  ]

  circleSeed.forEach((circle, index) => {
    circle.fixed = true;
    circle.frequency = 100 * (index + 2);
    circle.color = colors.papayaWhip;
    circle.flashColor = colors.newYorkPink;
    store.dispatch(addChunk(circle));
  });

  let bounceCircleMotion = new Point(4, 0)
  const bounceCircle = new Circle(center.x, center.y - yDiff + (radius * 1.414), radius, bounceCircleMotion)
  store.dispatch(addChunk(bounceCircle))
}
