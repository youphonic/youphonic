/*eslint-disable id-length */
import Circle from '../chunks/Circle';
import { addChunk } from './allChunks';
import store from '../store';

let center = store.getState().canvas.center;

export default function () {
  let xDiff = 250;
  let yDiff = 250;
  let radius = 60;

  let noMotion = new Point(0, 0)

  const circleSeed = [
<<<<<<< HEAD
    new Circle(center.x + xDiff, center.y + yDiff, radius),
    new Circle(center.x - xDiff, center.y + yDiff, radius),
    new Circle(center.x + xDiff, center.y - yDiff, radius),
    new Circle(center.x - xDiff, center.y - yDiff, radius),
  ];
=======
    new Circle(center.x + xDiff, center.y + yDiff, radius, noMotion),
    new Circle(center.x - xDiff, center.y + yDiff, radius, noMotion),
    new Circle(center.x + xDiff, center.y - yDiff, radius, noMotion),
    new Circle(center.x - xDiff, center.y - yDiff, radius, noMotion),
  ]
>>>>>>> 0169fc6f51007dea7d09ff9cb585899c1361e913

  circleSeed.forEach((circle, index) => {
    circle.frequency = 100 * (index + 2);
    store.dispatch(addChunk(circle));
  });

<<<<<<< HEAD
  let bounceCircleMotion = {
    x: 2,
    y: 0
  };

  const bounceCircle = new Circle(center.x, center.y - yDiff + radius, radius / 2, bounceCircleMotion);
  store.dispatch(addChunk(bounceCircle));
}
=======
  let bounceCircleMotion = new Point(2, 0)
  const bounceCircle = new Circle(center.x, center.y - yDiff + (radius * 1.414), radius, bounceCircleMotion)
  store.dispatch(addChunk(bounceCircle))

  // let bounceCircleMotion2 = new Point(2, 0)
  // const bounceCircle2 = new Circle(center.x, center.y - yDiff + radius, radius/2, bounceCircleMotion2)
  // const bounceCircle3 = new Circle(center.x, center.y - yDiff, radius/2, bounceCircleMotion)
  // store.dispatch(addChunk(bounceCircle2))

}
>>>>>>> 0169fc6f51007dea7d09ff9cb585899c1361e913
