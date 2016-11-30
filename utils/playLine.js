var vocoder = require('./vocoder')
var tts = require('./tts')
// var makeSynth = require('./makeSynth')
// var recordLoop = require('./recordLoop')
console.log('loadeded')
module.exports = function (ac, destination, line, options) {
  // var synth = makeSynth(ac, options.synth)
  tts(line, ac, options.voice, function (buffer) {

    // synth.start(ac.currentTime)
    vocoder(ac, buffer, options.synth)()
    // var recorder
    // if (options.record) {
    //   recorder = recordLoop(destination, line)
    // }
    // synth.onEnd = recorder
    // vocoded()
  })
}
