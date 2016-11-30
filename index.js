var $ = require('jquery')
var vocoder = require('./utils/vocoder')
var tts = require('./utils/tts')

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
  var AudioContext = window.AudioContext || window.webkitAudioContext
  var ac = new AudioContext()
  var volume = ac.createGain()
  volume.connect(ac.destination)
  var oscillatorNode = ac.createOscillator();
  oscillatorNode.type = 'sawtooth';
  oscillatorNode.frequency.value = 440;

  var synthOptions = form2Obj($('.js-synth-controls').serializeArray())
  var voiceOptions = form2Obj($('.js-voice-controls').serializeArray())
  tts($textEl.val(), ac, voiceOptions, function (buffer) {

    // synth.start(ac.currentTime)
    var v = vocoder(ac, oscillatorNode, volume)
    oscillatorNode.start(ac.currentTime)


    var interval = setInterval(function () {
      oscillatorNode.frequency.value = [440, 493.88, 523.25, 587.33, 659.25, 698.46][~~(Math.random() * 6)] / 4

    }, 250)

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