import Tone from 'tone';

import masterBuss from './masterBuss';

const comp = new Tone.Compressor(-24, 6);
const channelVolume = new Tone.Volume(-12);
const channelBuss = channelVolume.chain(comp, masterBuss);

const twang = new Tone.MetalSynth(
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

export default twang;
