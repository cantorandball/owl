Owl = (typeof Owl == 'undefined') ? {} : Owl;

$(function() {
  var $recorderSection      = $('.recorder'),
      $playbackSection      = $('.playback'),
      $uploadingSection     = $('.uploading'),
      $uploadedSection      = $('.uploaded'),
      $recorderSectionTitle = $recorderSection.find('h1'),
      $playbackSectionTitle = $playbackSection.find('h1'),
      $recordVideoButton    = $('.js-record-video'),
      $cancelVideoButton    = $('.js-cancel-video'),
      $uploadVideoButton    = $('.js-upload-video'),
      $newStoryLink         = $('.js-new-story'),
      recordIconClass       = 'icon-videocam',
      stopIconClass         = 'icon-stop';

  function makeVisible($element) {
    $element.addClass('visible');
  }

  function makeInvisible($element) {
    $element.removeClass('visible');
  }

  /**
  Recorder UI changes
  */

  Owl.recorder.on('start', function() {
    $recorderSectionTitle.text('Recording…');
    $recordVideoButton.find('i').removeClass(recordIconClass).addClass(stopIconClass);
  });

  Owl.recorder.on('stop', function() {
    Owl.playback.loadMedia(Owl.recorder.getAudioURL(),
                           Owl.recorder.getVideoURL(),
                           $playbackSection);

    makeInvisible($recorderSection);
    makeVisible($playbackSection);

    $recorderSectionTitle.text('Record your story');
    $recordVideoButton.find('i').removeClass(stopIconClass).addClass(recordIconClass);
  });

  Owl.uploader.on('upload', function() {
    makeInvisible($uploadingSection);
    makeVisible($uploadedSection);
  });

  Owl.uploader.on('error', function(errorArgs) {
    console.log('upload error', errorArgs);
  });

  /**
  UI action bindings
  */

  $recordVideoButton.on('click', Owl.recorder.toggleRecording.bind(Owl.recorder));

  $cancelVideoButton.on('click', function() {
    makeInvisible($playbackSection);
    makeVisible($recorderSection);
  });

  $uploadVideoButton.on('click', function() {
    makeInvisible($playbackSection);
    makeVisible($uploadingSection);

    Owl.uploader.uploadMedia(Owl.recorder.getAudioURL,
                             Owl.recorder.getVideoURL);
  });

  $newStoryLink.on('click', function(e) {
    e.preventDefault();
    makeInvisible($uploadedSection);
    makeVisible($recorderSection);
  });
});
