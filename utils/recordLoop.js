var Recorder = require('./recorder')
var worker = new Worker('./recorderWorkerMP3.js')

module.exports = function (tap, line) {

  var cassetteDeck = new Recorder(tap, {}, worker)
  // START IMMEDIATELY (?)
  cassetteDeck.record()

  return function stopIt () {
    cassetteDeck.stop()
    cassetteDeck.exportAudio(function (buffer) {
      Recorder.forceDownload(buffer, line.replace(/\s/g, '_') + '.mp3')
    })
  }

}

// call the module, pass it a destination/tap node, the line being rendered
// it returns a function that you call when yr done