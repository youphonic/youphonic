import Tone from 'tone';

import masterBuss from './masterBuss';
import { now } from './toneUtils';

const comp = new Tone.Compressor(-48, 10);
const channelVolume = new Tone.Volume(-4);
const channelBuss = channelVolume.chain(comp, masterBuss);


const lowPass = new Tone.Filter(
  {
    frequency: 250
  }).connect(channelBuss);

const bitCrush = new Tone.BitCrusher(4).connect(lowPass);
const reverb = new Tone.Freeverb(
  {
    wet: 1,
    roomSize: 0.74,
    dampening: 6182
  }
).fan(lowPass);

const tremolo = new Tone.Tremolo().set(
  {
    wet: 0.62,
    spread: 23,
    depth: 0.9,
    frequency: 1.5,
  }
).connect(channelBuss)
.start();

const pitchShift = new Tone.PitchShift(-9).fan(reverb, tremolo);
const crushSend = new Tone.Volume(-32).chain(channelBuss);

const granulator = new Tone.GrainPlayer(
  {
    url: '/samples/granSource_E.mp3',
    loop: true,
    detune: 15,
    drift: 0.038,
    overlap: 0.1,
    grainSize: 0.162,
    playbackRate: 0.618
  }
).fan(crushSend, pitchShift);

export default granulator;


//
// Automation
new Tone.LFO(0.75, 0.03, 0.38)
  .set({ type: 'triangle' })
  .connect(bitCrush.wet);

new Tone.LFO(0.75, 0.001, 0.38)
  .connect(pitchShift.feedback);

// new Tone.Loop(() => {
//   const timeBool = (now() % 1 > 0.5);
//   if (timeBool) {
//     granulator.detune += 5;
//     granulator.grainSize = (granulator.grainSize + 0.06) % 1;
//   } else {
//     granulator.detune -= 5;
//   }
// }, 4.5).start();
