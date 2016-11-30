var meSpeak = require("mespeak")
meSpeak.loadConfig(require("mespeak/src/mespeak_config.json"))
meSpeak.loadVoice(require("mespeak/voices/en/en-us.json"))


module.exports = function (line, ac, options, cb) {
  // TODO: ADD OPTIONS TO THE THINGY
  console.log(options)
  var stream = meSpeak.speak(line, Object.assign({rawdata: "default"}, options))
  ac.decodeAudioData(stream, function (audioData) {
    cb(audioData)
  })
}


// pitch: The voice pitch (default: 50)
// speed: The speed at which to talk (words per minute) (default: 175)
// voice: Which voice to use (default: last voice loaded or defaultVoice, see below)
// wordgap: Additional gap between words in 10 ms units (default: 0)