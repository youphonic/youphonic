import Tone from 'tone';


export const mainFilter = new Tone.Filter(1900, 'lowpass')
  .toMaster();

export const feedbackDel = new Tone.FeedbackDelay(0.12, 0.62);
feedbackDel.wet.value = 0.062;
feedbackDel.connect(mainFilter);

export const reverb = new Tone.Freeverb();
reverb.roomSize.value = 0.8;
reverb.dampening.value = 8000;
reverb.wet.value = 0.062;
reverb.connect(mainFilter);


export const dist = new Tone.Distortion(0.8);
dist.wet.value = 0.5;
dist.connect(mainFilter);

export const bandSplitter = new Tone.MultibandSplit(250, 1500);
bandSplitter.Q.value = 1;
bandSplitter.low.connect(mainFilter);
bandSplitter.mid.connect(reverb);
bandSplitter.high.connect(feedbackDel);

export const synthOne = new Tone.Synth({
	oscillator: {
		type: 'triangle'
	},
	envelope: {
		attack: 0.016,
		decay: 0.1,
		sustain: 0.09,
		release: 0.4
	}
}).connect(bandSplitter);

export const synthTwo = new Tone.Synth({
	oscillator: {
		type: 'square'
	},
	envelope: {
		attack: 0.016,
		decay: 0.1,
		sustain: 0.09,
		release: 0.4
	},
	volume: -12
}).connect(bandSplitter);