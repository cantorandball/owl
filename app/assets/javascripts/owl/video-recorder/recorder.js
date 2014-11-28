Owl = (typeof Owl == 'undefined') ? {} : Owl;

navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

Owl.recorder = (function(rtc) {
  var module = {},
      stream,
      audioRecorder,
      videoRecorder,
      audioURL,
      videoURL;

  $.extend(module, new WildEmitter());

  function onGetUserMedia(mediaStream) {
    stream        = mediaStream;
    audioRecorder = rtc(stream, {type: 'audio', bufferSize: 16384});
    videoRecorder = rtc(stream, {type: 'video'});

    audioRecorder.startRecording();
    videoRecorder.startRecording();

    module.emit('start');
  }

  function onGetUserMediaError(error) {
    console.log(error);
  }

  module.toggleRecording = function() {
    if (stream) {
      this.stop();
    } else {
      this.start();
    }

    return false;
  };

  module.start = function() {
    navigator.getUserMedia({audio: true, video: true}, onGetUserMedia, onGetUserMediaError);
  };

  module.stop = function() {
    stream.stop();
    stream = null;

    audioRecorder.stopRecording();
    videoRecorder.stopRecording();

    audioRecorder.getDataURL(function(audioDataURL) {
      videoRecorder.getDataURL(function(videoDataURL) {
        audioURL = audioDataURL;
        videoURL = videoDataURL;

        this.emit('stop');
      }.bind(this));
    }.bind(this));
  };

  module.getAudioURL = function() {
    return audioURL;
  };

  module.getVideoURL = function() {
    return videoURL;
  };

  return module;
})(RecordRTC);
