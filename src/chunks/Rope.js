import Tone from 'tone';

import Chunk from './Chunk';
import colors from '../colors';
import { scale } from './utils'

// hold total number of segments
let numSegments = 17;

export default class Rope extends Chunk {

  constructor(x1, y1, x2, y2, color = 'white') {
    super(new Point(0, 0), color)
    this.start = new Point(x1, y1);
    this.end = new Point(x2, y2);
    this.color = color;
    this.path = makePath(this.start, this.end, color);
    this.synth = new Tone.PluckSynth({
      attackNoise : 10,
      dampening : 7000,
      resonance : 0.95
    }).toMaster();
    this.type = 'rope';
    this.path.name = 'ropeBody';
    // don't cause hit responses in other Chunks
    this.causeHitResponse = false;
    // animation/Tone variables:
    // can it be played currently?
    this.enabled = true;
    // is it in 'animation' mode
    this.isAnimating = false;
    // total duration of an animation cycle (in seconds)
    this.animateTime = 0.5;
    // will hold the time that an animation was triggered
    this.currentAnimateTime = 0;
    this.frequency = 'C4';
  }

  triggerSynth() {
    this.synth.triggerAttack(this.frequency);
  }

  // gets called whenever string is intersected
  // sets isAnimating to true if not already animating
  triggerAnimate(time) {
    if (!this.isAnimating) {
      this.triggerSynth();
      this.isAnimating = true;
      this.currentAnimateTime = time;
    }
  }

  // update the view animation
  // called by update function
  animate(time) {
    // iterate through the segments of the Rope and update their position
    for (let i = 0; i < numSegments; i++) {
      let segment = this.path.segments[i];
      let checkNum = scale(i, 0, numSegments, -Math.PI * 3, Math.PI * 3)
      let sinus = Math.sin(checkNum * time);
      // Change the y position of the segment point:
      segment.point.y += sinus;
      segment.point.x += sinus;
    }
    // makes the path smooth
    this.path.smooth();
  }

  // called once at the end of the animation to redraw Rope into a straight line
  // maybe hacky - had to reset to prevent slight animation artifacts from compounding
  resetAnimation() {
    let direction = this.end.subtract(this.start)
    for (let i = 0; i < numSegments; i++) {
      let segment = this.path.segments[i];
      segment.point.x = this.start.x + ((i / numSegments) * direction.x)
      segment.point.y = this.start.y + ((i/numSegments) * direction.y)
    }
  }

  update(time) {
    if (this.isAnimating) {
      // if the current event time (time) is within the animateTime window
      // trigger animation
      if (time <= this.currentAnimateTime + this.animateTime) {
        let nextTime = ((time - this.currentAnimateTime) * 2 / this.animateTime) - 1;
        this.animate(nextTime)
      // otherwise, stop animation and reset
      } else {
        this.isAnimating = false;
        this.resetAnimation();
      }
    }
  }

  // redraw path on drag
  onDrag(event, endSelected) {
    // remove from DOM
    this.path.remove();
    // endSelected tracks whether the 'end' or 'start' of string was selected
    if (endSelected) {
      // find current start point
      this.start = new Point(this.path.segments[0].point.x, this.path.segments[0].point.y);
      this.path = makePath(this.start, event.point, this.color);
      this.end = event.point;
    } else {
      let endSegment = this.path.segments.pop();
      // find current end point
      this.end = new Point(endSegment.point.x, endSegment.point.y);
      this.path = makePath(event.point, this.end, this.color);
      this.start = event.point;
    }
    this.path.name = 'ropeBody'
  }

  updateStartEnd() {
    this.start = new Point(this.path.segments[0].point.x, this.path.segments[0].point.y);
    let endSegment = this.path.segments[this.path.segments.length - 1];
    this.end = new Point(endSegment.point.x, endSegment.point.y);
  }

}

// construct for the Rope path
function makePath(start, end, color) {
  let direction = end.subtract(start)
  let resultPath = new Path({
      strokeColor: color,
      strokeWidth: 2,
      strokeCap: 'round',
      strokeJoin: 'round',
      shadowColor: colors.blueStone,
      shadowBlur: 10,
      shadowOffset: new Point(2, 3)
    });

  for (let i = 0; i <= numSegments; i++) {
    let xPoint = start.x + ((i / numSegments) * direction.x);
    let yPoint = start.y + ((i / numSegments) * direction.y);
    let nextPoint = new Point(xPoint, yPoint)
    resultPath.add(nextPoint)
  }

  return resultPath;
}
