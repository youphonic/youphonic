import Tone from 'tone';

const reverb = new Tone.Freeverb().toMaster();
reverb.roomSize.value = 10;
reverb.dampening.value = 100;
reverb.wet.value = 0.3;

const filter = new Tone.Filter(1800, 'lowpass').connect(reverb);

export const synthOne = new Tone.Synth({
	oscillator: {
		type: 'square'
	},
	envelope: {
		attack: 0.01,
		decay: 0.3,
		sustain: 0.3,
		release: 1
	}
}).connect(filter);
