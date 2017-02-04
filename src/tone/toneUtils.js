import Tone from 'tone';

export const toggleTransport = (doIt = true) => {
  if (Tone.Transport.state === 'stopped') {
    Tone.Transport.start();
  // doIt is so you can call this function more than once
  // without ever stopping the Transport
  // maybe this is useless?
  } else if (doIt) {
    Tone.Transport.stop();
  }
};


// these may prove to be useless
export const start = audioSource => audioSource.start();
export const stop = audioSource => audioSource.stop();
export const now = () => Tone.Transport.now();
