import React from 'react';
import P5Wrapper from './P5Wrapper';

import Chunk from '../chunks/Chunk';
import Circle from '../chunks/Circle';

export default () => {
  // let testChunk = new Chunk(1, 2)
  // console.log('TESTING::::::');
  // console.log(testChunk);

  return (
    <div id="mainCanvas">
      <P5Wrapper sketch={sketch} />
    </div>
  );
}

function sketch (p) {
  let shapes = [];
  const circle1 = new Circle(p, 0, 0, 50);
  const circle2 = new Circle(p, 100, 100, 50);
  const circle3 = new Circle(p, -100, -100, 50);
  shapes.push(circle1, circle2, circle3);

  p.setup = function () {
    // set width and height of canvas on init
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {};

  p.draw = function () {
    p.background(100);
    p.stroke(0, 153, 255);
    shapes.forEach(shape => p[shape.shape](...shape.arguments));
    p.push();
    shapes = shapes.map(shape => {
      shape.position = shape.position.add(shape.direction);
      return shape;
    });
    p.pop();
  };
}
