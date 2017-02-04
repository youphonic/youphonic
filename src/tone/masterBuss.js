import Tone from 'tone';


//some overall compression to keep the levels in check
const masterCompressor = new Tone.Compressor({
	threshold: -6,
	ratio: 3,
	attack: 0.3,
	release: 0.2
});


//give a little boost to the lows
const lowBump = new Tone.Filter(210, 'lowshelf');


// a volume fader
// this value passed in here could be retrieved from
// a redux store for values used by Tone
const masterGain = new Tone.Volume(-8);


//route everything through the filter
//and compressor before going to the speakers
masterGain.chain(lowBump, masterCompressor, Tone.Master);

export default masterGain;
