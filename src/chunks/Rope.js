import Tone from 'tone';

import Chunk from './Chunk';
import colors from '../colors';

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
    this.animating = true;
    console.log(time);
    if (!this.currentAnimateTime) {
      this.currentAnimateTime = time;
      this.animate(time);
    } else {

    }

  }

  animate(time) {
    for (let i = 0; i < 10; i++) {
      let segment = this.path.segments[i];
      // A cylic value between -1 and 1
      var sinus = Math.sin(event.time * 3 + i);
      // Change the y position of the segment point:
      segment.point.y = sinus * 60 + 100;
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

  for (let i = 0; i < 10; i++) {
    let nextPoint = new Point(start.x + ((i / 10) * direction.x), start.y + ((i/10) * direction.y))
    resultPath.add(nextPoint)
  }

  return resultPath;
}