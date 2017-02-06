import Tone from 'tone';
import masterBuss from './masterBuss';

const comp = new Tone.Compressor(-24, 6);
const channelBuss = new Tone.Volume(-12)
  .connect(comp)
  .send('masterBuss');

// synth for "crackle"
export const twang = new Tone.MetalSynth(
  {
		harmonicity: 1,
		resonance: 440,
		modulationIndex: 1,
		envelope: {
			decay: 0.2,
		},
    octaves: 3,
		volume: -16
	}
).connect(channelBuss);

// envelope for "fizzle"
export const fizz = new Tone.AmplitudeEnvelope(
  {
    attack: 0.003,
    decay: 0.2,
    sustain: 0.06,
    release: 0.8
  }
).connect(channelBuss);

const noise = new Tone.Noise(
  {
    volume: -10,
    type: 'pink'
  }
).connect(fizz).start();
