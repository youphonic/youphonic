import Tone from 'tone';

import Chunk from './Chunk';
import colors from '../colors';
import { scale } from './utils'

let points = 17;

export default class Rope extends Chunk {
  constructor(x1, y1, x2, y2, color = 'white') {
    super(new Point(0, 0), color)
    this.start = new Point(x1, y1);
    this.end = new Point(x2, y2);
    this.path = makePath(this.start, this.end, color)
    this.synth = new Tone.PluckSynth().toMaster();
    this.type = 'string';
    this.enabled = true;
    this.animating = false;
    this.animateTime = 0.5;
    this.currentAnimateTime = 0;
  }

  triggerSynth() {
    if (this.enabled) {
      let that = this;
      this.synth.triggerAttack('C4');
      this.enabled = false;
      setTimeout(function() {
        that.enabled = true;
      }, 500)
    }
  }

  triggerAnimate(time) {
    if (!this.animating) {
      this.animating = true;
      this.currentAnimateTime = time;
    }
  }

  animate(time) {
    console.log('animateTime', time);
    for (let i = 0; i < points; i++) {
      let segment = this.path.segments[i];

      let scaledSin = (num) => scale(Math.sin(num / points), -1, 1, -20, 20);
      let checkNum = i <= points / 2 ? scale(i, 0, points / 2, -Math.PI, Math.PI) : scale(points - i - 1, 0, points / 2, -Math.PI, Math.PI)
      let multTime = time < .5 ? time : 1.0 - time;

      let sinus = Math.sin(checkNum * multTime) * 10;

      // Change the y position of the segment point:
      segment.point.y += sinus;
      segment.point.x += sinus;
    }
    this.path.smooth();
  }

  update(time) {
    if (this.animating) {
      if (time <= this.currentAnimateTime + this.animateTime) {
        let nextTime = (time - this.currentAnimateTime) / this.animateTime;
        this.animate(nextTime)
      } else {
        this.animating = false;
      }
    }
  }
}

function makePath(start, end, color) {
  let direction = end.subtract(start)
  console.log(direction);
  let resultPath = new Path({
      strokeColor: color,
      strokeWidth: 2,
      strokeCap: 'round',
      strokeJoin: 'round'
    });

  for (let i = 0; i < points; i++) {
    let nextPoint = new Point(start.x + ((i / points) * direction.x), start.y + ((i/points) * direction.y))
    resultPath.add(nextPoint)
  }

  return resultPath;
}