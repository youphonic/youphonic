import Circle from './Circle';
import granulator from '../tone/grainDrone';
import { toggleTransport } from '../tone/toneUtils';


export default class Drone extends Circle {
  constructor(x, y, radius, direction, color) {
    super(x, y, radius, direction, color);
    this.synth = granulator;
    this.playSynth = false;
    this.type = 'drone';
  }

  toggleDrone() {
    // if Tone's transport is stopped, start it
    toggleTransport(false);
    // toggle the drone on/off
    this.playSynth = !this.playSynth;
    if (this.playSynth) {
      this.synth.start();
    } else {
      this.synth.stop();
    }
  }
}
