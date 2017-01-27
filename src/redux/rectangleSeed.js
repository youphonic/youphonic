import Circle from '../chunks/Circle'
import { addChunk } from './allChunks'
import { ourP5 } from '../components/P5Wrapper'
import store from '../store'

export default function () {
  let xDiff = 250;
  let yDiff = 250;
  let radius = 60;
  let h = 10;

  let noMotion = ourP5.createVector(0, 0)

  const circleSeed = [
    new Circle(xDiff, yDiff, radius, noMotion),
    new Circle(-xDiff, yDiff, radius, noMotion),
    new Circle(xDiff, -yDiff, radius, noMotion),
    new Circle(-xDiff, -yDiff, radius, noMotion),
  ]

  circleSeed.forEach((circle, index) => {
    circle.rotation = ((index + 1) * Math.PI / 2)
    store.dispatch(addChunk(circle))
  });
}