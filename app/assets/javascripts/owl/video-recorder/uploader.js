Owl = (typeof Owl == 'undefined') ? {} : Owl;

Owl.uploader = (function($) {
  var module = {};

  $.extend(module, new WildEmitter());

  function onUploadMedia() {
    module.emit('upload');
  }

  function onUploadMediaError(xhr, errorText, error) {
    module.emit('error');
  }

  module.uploadMedia = function(audioDataURL, videoDataURL) {
    var xhr;

    xhr = $.ajax({
      url: 'http://api.ph.cantorandball.com/videos',
      type: 'POST',
      data: {
        audio: audioDataURL,
        video: videoDataURL
      }
    });

    xhr.done(onUploadMedia);
    xhr.fail(onUploadMediaError);
  };

  return module;
})($);
