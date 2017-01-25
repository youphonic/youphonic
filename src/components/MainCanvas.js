import React from 'react';
import P5Wrapper from 'react-p5-wrapper';

export default () => {
  return (
    <div id="mainCanvas">
      <P5Wrapper sketch={sketch} />
    </div>
  )
}

function sketch (p) {
  let rotation = 0;

  p.setup = function () {
    // set width and height of canvas on init
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.rotation){
      rotation = props.rotation * Math.PI / 180;
    }
  };

  p.draw = function () {
    p.background(100);
    p.noStroke();
    p.push();
    p.rotateY(rotation);
    p.box(100);
    p.pop();
  };
};