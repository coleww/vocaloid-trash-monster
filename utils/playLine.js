// var vocoder = require('@coleww/vocoder')
var tts = require('./tts')
// var makeSynth = require('./makeSynth')
// var recordLoop = require('./recordLoop')

module.exports = function (ac, destination, line, options) {
  // var synth = makeSynth(ac, options.synth)
  tts(line, ac, options.voice, function (buffer) {
    var source = ac.createBufferSource()
    source.buffer = buffer
    source.connect(destination)
    source.start(ac.currentTime)


    // var vocoded = vocoder(ac, synth.node, buffer, destination)
    // var recorder
    // if (options.record) {
    //   recorder = recordLoop(destination, line)
    // }
    // synth.start(ac.currentTime)
    // synth.onEnd = recorder
    // vocoded.start(ac.currentTime)
  })
}