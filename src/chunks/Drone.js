import Chunk from './Chunk';
// import granulator from '../tone/grainDrone';
import { drone1, drone2 } from '../tone/dronez';
import { droneGenerator } from './shapeGenerators';
import { now, toggleTransport } from '../tone/toneUtils';


export default class Drone extends Chunk {
  constructor(x, y, radius, color) {
    super(new Point(0, 0), color);
    this.synth = drone1;
    this.fixed = true;
    // radius is necessary for collisions
    this.radius = radius;
    // animation/Tone variables:
    // can it be played currently?
    this.enabled = false;
    // is it in 'animation' mode
    this.isAnimating = false;
    // will hold the time that a play was triggered
    this.currentPlayTime = 0;
    // // will this Chunk trigger hit responses?
    // this.causeHitResponse = false;
    this.path = droneGenerator(
      new Point(x, y),
      radius,
      color
    );

    this.type = 'drone';
  }

  react(shape, time) {
    this.onOff(0, 1, time);
  }

  switchSample(sampleName) {
    switch (sampleName) {
      case 'drone1':
        this.synth = drone1;
        break;
      case 'drone2':
        this.synth = drone2;
        break;
      // case 'granulator':
      // //   this.synth = granulator;
      //   break;
      default:
        this.synth = drone1;
    }
  }

  onOff(pitchOffset, vel, time) {
    if (this.enabled) {
      this.enabled = false;
      this.synth.triggerRelease(now(0.01));
    } else {
      this.enabled = true;
      this.currentPlayTime = time;
      this.synth.triggerAttack(pitchOffset, now(0.005), vel);
    }
  }

  // // this is for the granulator synth
  // toggleDrone() {
  //   // if Tone's transport is stopped, start it
  //   toggleTransport(false);
  //   // toggle the drone on/off
  //   this.isPlaying = !this.isPlaying;
  //   if (this.isPlaying) {
  //     this.synth.start();
  //   } else
  //     this.synth.stop();
  //   }
  // }

  shouldSpin(isPlaying, time) {
    this.isAnimating = isPlaying;
    this.currentPlayTime = time;
  }

  // update the view animation
  // called by update function
  animate(time) {
    this.path.children[0].rotate(2);
    this.path.children[0].shadowOffset.x = Math.cos(time * 4) * 10;
    this.path.children[0].shadowOffset.y = Math.sin(time * 4) * 10;
    this.path.children[1].rotate(-2);
    this.path.children[1].shadowOffset.x = Math.cos(time * 2) * 10;
    this.path.children[1].shadowOffset.y = Math.sin(time * 2) * 10;
    this.path.children[2].rotate(2);
    this.path.children[2].shadowOffset.x = Math.cos(time * 3) * 10;
    this.path.children[2].shadowOffset.y = Math.sin(time * 3) * 10;
  }

  update(time) {
    this.animate(time);
  }
}
