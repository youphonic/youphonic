import Tone from 'tone';

import masterBuss from './masterBuss';
import { now } from './toneUtils';

const channelVolume = new Tone.Volume(-8);

const comp = new Tone.Compressor(-48, 12);

const channelBuss = channelVolume.chain(comp, masterBuss);


const reverb = new Tone.Freeverb({
  wet: 1,
  roomSize: 0.89,
  dampening: 6000
}).connect(channelBuss);

const lowPass = new Tone.Filter().fan(reverb, channelBuss);

const bitCrush = new Tone.BitCrusher(2)
.connect(lowPass);

const tremolo = new Tone.Tremolo()
  .set({
    wet: 0.62,
    spread: 45,
    depth: 0.9,
    frequency: 1.5,
    type: 'sawtooth'
  })
  .connect(channelBuss)
  .start();

const pitchShift = new Tone.PitchShift(-24)
  .fan(tremolo);


export const granulator = new Tone.GrainPlayer({
  url: '/samples/granSource_E.mp3',
  loop: true,
  detune: 0,
  drift: 0.038,
  overlap: 0.38,
  grainSize: '+0.11',
  playbackRate: 0.62
}).fan(lowPass, pitchShift);


//
// Automation
new Tone.LFO(0.75, 0.005, 0.162)
  .set({ type: 'triangle' })
  .connect(bitCrush.wet);

new Tone.LFO(1.5, 0.01, 0.38)
  .connect(pitchShift.feedback);

new Tone.Loop(() => {
  const timeBool = (now() % 1 > 0.5);
  if (timeBool) {
    granulator.detune += 50;
    granulator.grainSize = (granulator.grainSize + 0.6) % 1;
  } else {
    granulator.detune -= 50;
  }
}, 4.5).start();
