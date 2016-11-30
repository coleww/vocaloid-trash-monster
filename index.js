var $ = require('jquery')
var vocoder = require('./utils/vocoder')
var tts = require('./utils/tts')
var AudioContext = window.AudioContext || window.webkitAudioContext
var ac = new AudioContext()

var volume = ac.createGain()
volume.connect(ac.destination)
// $('form').serializeArray()
// =>
// [
//   {"name":"foo","value":"1"},
//   {"name":"bar","value":"xxx"},
//   {"name":"this","value":"hi"}
// ]

// play button => calls playLine, passes it all the data
var $textEl = $('.text-lyric')
$('.play-btn').click(function () {
  var synthOptions = form2Obj($('.js-synth-controls').serializeArray())
  var voiceOptions = {}
  tts($textEl.val(), ac, voiceOptions, function (buffer) {

    // synth.start(ac.currentTime)
    vocoder(ac, buffer, synthOptions)()
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