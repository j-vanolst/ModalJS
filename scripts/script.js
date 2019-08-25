const synth = new Tone.Synth({
  oscillator: {
    type: 'triangle8'
  },
  envelope: {
    attack: 1.5,
    decay: 1,
    sustain: 0.4,
    release: 4
  }
}).toMaster()

const polySynth = new Tone.PolySynth(6, Tone.Synth).toMaster()
//polySynth.set('detune', -50)


function ionian() {
  synth.triggerAttackRelease('C3', 0.2, 0.2)
  synth.triggerAttackRelease('D3', 0.2, 0.4)
  synth.triggerAttackRelease('E3', 0.2, 0.6)
  synth.triggerAttackRelease('F3', 0.2, 0.8)
  synth.triggerAttackRelease('G3', 0.2, 1.0)
  synth.triggerAttackRelease('A3', 0.2, 1.2)
  synth.triggerAttackRelease('B3', 0.2, 1.4)
  synth.triggerAttackRelease('C4', 0.2, 1.6)
}

function chordProgression() {
  // I - vi - IV - V
  polySynth.triggerAttackRelease(['C4', 'E4', 'G4'], '1m', '1:0:0')
  polySynth.triggerAttackRelease(['A4', 'C4', 'E4'], '1m', '2:0:0')
  polySynth.triggerAttackRelease(['F4', 'A4', 'C4'], '1m', '3:0:0')
  polySynth.triggerAttackRelease(['G4', 'B4', 'D4'], '1m', '4:0:0')
}

var ionianChords = new Tone.Part(function(time, event){
  polySynth.triggerAttackRelease(event.note, event.dur, time)
},
[
  {time: '0:0:0', note: ['C4', 'E4', 'G4'], dur: '1m'},
  {time: '1:0:0', note: ['A4', 'C4', 'E4'], dur: '1m'},
  {time: '2:0:0', note: ['F4', 'A4', 'C4'], dur: '1m'},
  {time: '3:0:0', note: ['G4', 'B4', 'D4'], dur: '1m'},

])

var arpeggio = new Tone.Pattern(function(time, note){
  synth.triggerAttackRelease(note, '8n');
}, ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'], 'random')

$(document).ready(function() {
  //ionian()
  // ionianChords.start(0)
  // ionianChords.loop = 2
  // ionianChords.loopEnd = '4m'
  arpeggio.start(0)
  Tone.Transport.start(0)


  //chordProgression()
})
