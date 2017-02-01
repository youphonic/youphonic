import Tone from 'tone';

export const player = new Tone.Player().toMaster();

export const drumBuffers = new Tone.Buffers({
  'kick': '/samples/kick.mp3',
  'snare': '/samples/snare.mp3',
  'floorTom': '/samples/floor-tom.mp3',
  'hiTom': '/samples/hi-tom.mp3',
  'hiHatClose': '/samples/hi-hat-close.mp3',
  'hiHatOpen': '/samples/hi-hat-open.mp3',
  'hiHatHit': '/samples/hi-hat-hit.mp3',
  'rideCrash': '/samples/ride-crash.mp3',
  'crossStick': '/samples/xstick.mp3'
}, function() {
})

export const possibilities = ['kick', 'snare', 'floorTom', 'hiTom', 'hiHatClose', 'hiHatOpen', 'hiHatHit', 'rideCrash', 'crossStick'];