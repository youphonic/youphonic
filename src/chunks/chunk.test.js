const mocha = require('mocha');
const p5Lib = require('p5');
const chai = require('chai');
const expect = chai.expect;
// const chaiEnzyme = require('chai-enzyme')

// chai.use(chaiEnzyme()) // Note the invocation at the end

function sketch (p) {
  let rotation = 0;
  console.log('~~~~~~~');
  console.log(p);

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

const Chunk = require('./Chunk');

describe('Chunk constructor', () => {

  let testVector
  let p5 = new p5Lib((p) => {
    p.setup = () => {};
    p.draw = () => {};
  }, null, "wrapper")
  console.log(p5);
  beforeEach('create test chunk', () => {
    console.log();
    testVector = p5Lib.createVector(5, 5);
  })

  it('has a p5 Vector as its .position', () => {
    let testChunk = new Chunk(5, 5);
    expect(testChunk.position).to.be.deep.equal(testVector);
  })
})