import Tone from 'tone';
import masterBuss from './masterBuss';

const comp = new Tone.Compressor(-24, 6);
const channelBuss = new Tone.Volume(-12)
  .connect(comp)
  .send('masterBuss');

// synth for "crackle"
export const twang = new Tone.MetalSynth(
  {
		harmonicity: 12,
		resonance: 800,
		modulationIndex: 20,
		envelope: {
			decay: 0.4,
		},
		volume: -15
	}
).connect(channelBuss);

// envelope for "fizzle"
export const fizz = new Tone.AmplitudeEnvelope(
  {
    attack: 0.003,
    decay: 0.2,
    sustain: 1,
    release: 0.8
  }
).connect(channelBuss);

const noise = new Tone.Noise(
  {
    volume: -10,
    type: 'pink'
  }
).connect(fizz).start();
