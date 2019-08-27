var padLowPass = new Tone.Filter(600, 'lowpass')
var padAmpEnv = new Tone.AmplitudeEnvelope({
  attack: 4,
  decay: 1,
  sustain: 0,
  release: 4
})
var padResonance = new Tone.FeedbackCombFilter(0, 0.1)
padReverb = new Tone.JCReverb(0.8)
padReverb.wet.value = 0.2
padDelay = new Tone.FeedbackDelay({
  delayTime: 0.4,
  feedback: 0.4
})
padChorus = new Tone.Chorus({
  frequency: 1,
  delayTime: 3.5,
  depth: 0.5,
  type: 'sine',
  spread: 180,
  wet: 0.5
})
var pad = new Tone.PolySynth(6, Tone.DuoSynth, {
  volume: -20,
  vibratoAmount: 0,
  vibratoRate: 0,
  voice0: {
    portamento: 1.2,
    oscillator: {
      type: 'triangle'
    },
    filterEnvelope: {
      attack: 4,
      decay: 0,
      sustain: 0,
      release: 4
    },
    envelope: {
      attack: 4,
      decay: 1,
      sustain: 1,
      release: 4
    }
  },
  voice1: {
    portamento: 1.2,
    oscillator: {
      type: 'square'
    },
    filterEnvelope: {
      attack: 4,
      decay: 0,
      sustain: 0,
      release: 4
    },
    envelope: {
      attack: 4,
      decay: 1,
      sustain: 1,
      release: 3
    }
  }
}).connect(padAmpEnv).chain(padLowPass, padResonance, padReverb, padDelay, padChorus, Tone.Master)
