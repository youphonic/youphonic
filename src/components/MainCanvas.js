import React from 'react';

import P5Wrapper from './P5Wrapper';
import Chunk from '../chunks/Chunk';
import Circle from '../chunks/Circle';

import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    allChunks: state.allChunks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    empty: {}
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)((props) => {

  return (
    <div id="mainCanvas">
      <P5Wrapper sketch={sketch}/>
    </div>
  );
}

function sketch (p) {
  // array to hold current canvas shapes
  let shapes = [];
  const circle1 = new Circle(p, 0, 0, 50);
  const circle2 = new Circle(p, 100, 100, 50);
  const circle3 = new Circle(p, -100, -100, 50);
  shapes.push(circle1, circle2, circle3);

  p.setup = function () {
  )
})

function sketch(p) {
  let rotation = 0;
  p.setup = function() {
    // set width and height of canvas on init
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {};

  p.draw = function () {
    // create background
    p.background(100);
    // set stroke color
    p.stroke(0, 153, 255);

    // draw all shapes in the array with its arguments
    shapes.forEach(shape => p[shape.shape](...shape.arguments));
    // update shape position
    shapes = shapes.map(shape => {
      shape.position = shape.position.add(shape.direction);
      // add bounce dynamic to edges
      if (shape.position.y < (0 - p.height / 2) || shape.position.y > p.height / 2) {
       shape.direction.y *= -1
      }
      if (shape.position.x < (0 - p.width / 2) || shape.position.x > p.width / 2) {
        shape.direction.x *= -1
      }
      return shape;
    });
  };
}

