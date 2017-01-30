import Circle from '../chunks/Circle'
import { addChunk } from './allChunks'
import store from '../store'

const center = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
}

export default function () {
  let xDiff = 250;
  let yDiff = 250;
  let radius = 60;

  const circleSeed = [
    new Circle(center.x + xDiff, center.y + yDiff, radius),
    new Circle(center.x - xDiff, center.y + yDiff, radius),
    new Circle(center.x + xDiff, center.y - yDiff, radius),
    new Circle(center.x - xDiff, center.y - yDiff, radius),
  ]

  circleSeed.forEach((circle, index) => {
    circle.frequency = 100 * (index + 2)
    store.dispatch(addChunk(circle))
  });

  let bounceCircleMotion = {
    x: 2,
    y: 0
  }
  const bounceCircle = new Circle(center.x, center.y - yDiff + radius, radius/2, bounceCircleMotion)
  store.dispatch(addChunk(bounceCircle))
}