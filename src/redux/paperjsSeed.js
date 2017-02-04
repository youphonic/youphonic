/*eslint-disable id-length */
import Circle from '../chunks/Circle';
import Rope from '../chunks/Rope';
import Emitter from '../chunks/Emitter';
import Rectangle from '../chunks/Rectangle';
import Drone from '../chunks/Drone';
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
    circle.frequency = "C" + (index + 2);
    circle.color = colors.papayaWhip;
    circle.flashColor = colors.newYorkPink;
    store.dispatch(addChunk(circle));
  });

  let bounceCircleMotion = new Point(4, 0)
  const bounceCircle = new Circle(center.x, center.y - yDiff + (radius * 1.414), radius, bounceCircleMotion)
  store.dispatch(addChunk(bounceCircle));

  // just testing the drone
  // const droneChunk = new Drone(center.x, center.y, 30, noMotion, colors.madang);
  // store.dispatch(addChunk(droneChunk));

  // uncomment to seed a Rope Chunk
  //let seedRope = new Rope(center.x - 100, center.y + 100, center.x + 100, center.y - 100, colors.blueStone)
  //store.dispatch(addChunk(seedRope));

  // uncomment to seed an Emitter Chunk
  // let newEmitter = new Emitter(center.x-240, center.y, 50, Math.PI / 4);
  // store.dispatch(addChunk(newEmitter))

  // uncomment to seed a Rectangle
  // let newRect = new Rectangle(center.x + 40, center.y + 40, 75, 75, noMotion, colors.flamingo);
  // newRect.path.rotate(30);
  // store.dispatch(addChunk(newRect))
}
