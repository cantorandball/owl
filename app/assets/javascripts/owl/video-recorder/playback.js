Owl = (typeof Owl == 'undefined') ? {} : Owl;

Owl.playback = (function() {
  var module = {};

  $.extend(module, new WildEmitter());

  module.loadMedia = function(audioDataURL, videoDataURL, $playbackSection) {
    var video, audio;

    $video = $playbackSection.find('video');
    $video[0].src = videoDataURL;
    $audio = $playbackSection.find('audio');
    $audio[0].src = audioDataURL;

    $video.on('play', function() {
      $audio[0].play();
      $audio[0].currentTime = $video[0].currentTime;
    });

    $video.on('pause', function() {
      $audio[0].pause();
    });

    this.emit('load');
  };

  return module;
})();
