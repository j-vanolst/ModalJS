/*Declaration of scales*/
const ionian = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']
const dorian = ['C4', 'D4', 'Eb4', 'F4', 'G4', 'A4', 'Bb4']
const phrygian = ['C4', 'Db4', 'Eb4', 'F4', 'G4', 'Ab4', 'Bb4']
const lydian = ['C4', 'D4', 'E4', 'F#4', 'G4', 'A4', 'B4']
const mixolydian = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'Bb4']
const aeolian = ['C4', 'D4', 'Eb4', 'F4', 'G4', 'Ab4', 'Bb4']
const locrian = ['C4', 'Db4', 'Eb4', 'F4', 'Gb4', 'Ab4', 'Bb4']


/* TODO:
Create a function that returns the notes from an entered chord
such as getNotes(CMaj) = [C, E, G] etc
Maj: Maj 3rd + Min 3rd
Min: Min 3rd + Maj 3rd
Dim: Min 3rd + Min 3rd
 */
function getChord(tonic = 'C', type = 'maj'){
  let tonicIndexes = {'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5, 'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11}
  let notes = ['C4', 'C#4', "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4"]

  let tonicIndex = tonicIndexes[tonic]

  if (type == 'min'){
    return [notes[tonicIndex], notes[(tonicIndex + 3) % 11], notes[(tonicIndex + 7) % 11]]
  }
  else if (type == 'maj'){
    return [notes[tonicIndex], notes[(tonicIndex + 4) % 11], notes[(tonicIndex + 7) % 11]]
  }
  else if (type == 'dim'){
    return [notes[tonicIndex], notes[(tonicIndex + 3) % 11], notes[(tonicIndex + 6) % 11]]
  }
}

console.log(getChord())

 /*Chord progression will be I vi IV V in each mode
Ionian: I vi IV V
Dorian: i vi(dim) iv V
Phrygian: i VI iv v(dim)
Lydian: I vi iv(dim) V
Mixolydian: I vi IV v
Aeolian: i VI iv v
Locrian: i(dim) VI iv V
 */



const synth = new Tone.Synth({
  oscillator: {
    type: 'sine'
  },
  envelope: {
    attack: 1.5, //0 - 2
    decay: 1, //0 - 2
    sustain: 0.4,
    release: 4
  }
}).toMaster()

const polySynth = new Tone.PolySynth(6, Tone.Synth).toMaster()
//polySynth.set('detune', -50)

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
  {time: '0:0:0', note: getChord('C', 'maj'), dur: '1m'},
  {time: '1:0:0', note: getChord('A', 'min'), dur: '1m'},
  {time: '2:0:0', note: getChord('F', 'maj'), dur: '1m'},
  {time: '3:0:0', note: getChord('G', 'maj'), dur: '1m'},

])

var arpeggio = new Tone.Pattern(function(time, note){
  synth.triggerAttackRelease(note, '8n');
}, dorian, 'upDown')

$(document).ready(function() {
  //ionian()
  // ionianChords.start(0)
  // ionianChords.loop = 2
  // ionianChords.loopEnd = '4m'
  arpeggio.start(0)
  Tone.Transport.start(0)
  document.getElementById('mute').addEventListener('click', function() {
    console.log('test')
    arpeggio.stop()
  })

  //chordProgression()
})
