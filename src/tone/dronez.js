import Tone from 'tone';
import masterBuss from './masterBuss';

const channelBuss = new Tone.Volume(-4).send('masterBuss');

export const drone1 = new Tone.Sampler(
  {
    url: '/samples/StringyPadA_C.mp3',
    loop: true,
    envelope: {
      attack: 0.001,
      decay: 0,
      sustain: 1,
      release: 0.62
    }
  }
).connect(channelBuss);

export const drone2 = new Tone.Sampler(
  {
    url: '/samples/StringyPadB_C.mp3',
    loop: true,
    envelope: {
      attack: 0.001,
      decay: 0,
      sustain: 1,
      release: 0.62
    }
  }
).connect(channelBuss);
