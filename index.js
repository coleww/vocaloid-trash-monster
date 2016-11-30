var $ = require('jquery')
var playLine = require('./utils/playLine')
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
  var synthOptions = $('.js-synth-controls').serializeArray()
  playLine(ac, volume, $textEl.val(), {synth: form2Obj(synthOptions), voice: {}})
})


function form2Obj(arr) {

  return arr.reduce(function (acc, el) {
    acc[el.name] = el.value
    return acc
  }, {})
}