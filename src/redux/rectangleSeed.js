import Circle from '../chunks/Circle'
import { addChunk } from './allChunks'
import { ourP5 } from '../components/P5Wrapper'
import store from '../store'

export default function () {
  let xDiff = 250;
  let yDiff = 250;
  let radius = 60;

  let noMotion = ourP5.createVector(0, 0)

  const circleSeed = [
    new Circle(xDiff, yDiff, radius, noMotion),
    new Circle(xDiff * 2, yDiff, radius, noMotion),
    new Circle(xDiff, yDiff * 2, radius, noMotion),
    new Circle(xDiff * 2, yDiff * 2, radius, noMotion),
  ]

  circleSeed.forEach((circle, index) => {
    circle.rotation = ((index + 1) * Math.PI / 2)
    circle.frequency = 100 * (index + 2)
    store.dispatch(addChunk(circle))
  });

  let bounceCircleMotion = ourP5.createVector(4, 0)

  const bounceCircle = new Circle(0, -yDiff + radius, radius/2, bounceCircleMotion)

  store.dispatch(addChunk(bounceCircle))
}