var $ = require('jquery')
var vocoder = require('./utils/vocoder')
var tts = require('./utils/tts')
var int2freq = require('int2freq')
var teoria = require('teoria')





var tonic = 'C4'
var scale = 'major'
var bpm = 120

$('.tonic-select').on('change', function () {
  tonic = $(this).val() + '4'
  renameNoteMarkers()
})

$('.scale-select').on('change', function () {
  scale = $(this).val()
  renameNoteMarkers()
})

$('.bpm-select').on('change', function () {
  bpm = $(this).val()
})
function convertIdxToNote (i, tonic, scale) {

  var freq = int2freq(i, {tonic: tonic, scale: scale})
  var note = teoria.note.fromFrequency(freq)
  return note.note.toString().slice(0, -1)
}

var pianoRoll = $('.piano-roll')
var pianoTable = $('<table>')

var notes = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]

for (var i = -7; i < 8; i++) {
  var pianoRow = $('<tr>')

  var noteMarker = $('<td class="note-marker" data-note="' + i + '">' + convertIdxToNote(i, tonic, scale) +'</td>')
  noteMarker.appendTo(pianoRow)
  for (var step = 0; step < 16; step++) {
    var pianoCell = $('<td class="cell" data-step="' + step + '" data-note="' + i + '">')
    pianoCell.appendTo(pianoRow)
  }
  pianoRow.appendTo(pianoTable)
}

pianoTable.appendTo(pianoRoll)

pianoTable.on('click', 'td.cell', function () {
  var clickedCell = $(this)
  var selectedStep = clickedCell.data('step')
  var wasOn = clickedCell.hasClass('note-on')
  $('td[data-step="' + selectedStep + '"').removeClass('note-on')

  if (wasOn) {
    notes[selectedStep] = null
  } else {
    $(this).addClass('note-on')
    notes[selectedStep] = clickedCell.data('note')
  }



})


function renameNoteMarkers() {
  for (var i = -7; i < 8; i++) {

    var noteMarker = $('td.note-marker[data-note="' + i + '"]')
    noteMarker.text(convertIdxToNote(i, tonic, scale))

  }
}





















// play button => calls playLine, passes it all the data
var $textEl = $('.text-lyric')
$('.play-btn').click(function () {
  var AudioContext = window.AudioContext || window.webkitAudioContext
  var ac = new AudioContext()
  var volume = ac.createGain()
  volume.connect(ac.destination)
  var oscillatorNode = ac.createOscillator();
  oscillatorNode.type = 'sawtooth';
  oscillatorNode.frequency.value = int2freq(notes[0], {tonic: tonic, scale: scale}) || 440;

  var synthOptions = form2Obj($('.js-synth-controls').serializeArray())
  var voiceOptions = form2Obj($('.js-voice-controls').serializeArray())
  tts($textEl.val(), ac, voiceOptions, function (buffer) {

    // synth.start(ac.currentTime)
    var v = vocoder(ac, oscillatorNode, volume)
    oscillatorNode.start(ac.currentTime)
    var noteCounter = 1;

    var interval = setInterval(function () {
      if (notes[noteCounter]) {
        oscillatorNode.frequency.value = int2freq(notes[noteCounter], {tonic: tonic, scale: scale});
      }
      noteCounter++
      if (noteCounter >= 16) {
        noteCounter = 0
      }
    }, 60000.0 / bpm)

    v(buffer, synthOptions)


    setTimeout(function () {
      clearInterval(interval)
      console.log('stahp it')
      ac.close()
    }, modulatorNode.buffer.duration * 1000)
    // var recorder
    // if (options.record) {
    //   recorder = recordLoop(destination, line)
    // }
    // synth.onEnd = recorder
    // vocoded()
  })
})


function form2Obj(arr) {

  return arr.reduce(function (acc, el) {
    acc[el.name] = el.value
    return acc
  }, {})
}