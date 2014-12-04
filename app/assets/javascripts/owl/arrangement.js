$(function() {
  var $newPartSelection         = $('.new-part-selection'),
      $newPartSelectionLauncher = $('.js-new-part'),
      $newPartButtons           = $('.js-new-part-buttons'),
      $newPartVideoButton       = $('.js-new-part-video-button'),
      $newPartVideo             = $('.js-new-part-video'),
      $newPartImageButton       = $('.js-new-part-image-button'),
      $newPartImage             = $('.js-new-part-image'),
      $newPartTextButton        = $('.js-new-part-text-button'),
      $newPartText              = $('.js-new-part-text'),
      storyID                   = $newPartSelection.data('story-id');

  $newPartSelection.on('click', function(event) {
    if (!$(event.target).closest('.new-part-selection > div').length) {
      $newPartSelection.hide();
    }
  });

  function hideParts() {
    $('div[class^="new-part-"],div[class*=" new-part-"]').hide();
  }

  $newPartVideoButton.on('click', function() {
    $newPartVideo.find('section').removeClass('visible');
    $newPartVideo.find('.recorder').addClass('visible');
    hideParts();
    $newPartVideo.show();
    $newPartSelection.show();
  });

  $newPartImageButton.on('click', function() {
    hideParts();
    $newPartImage.show();
    $newPartSelection.show();
  });

  $newPartTextButton.on('click', function() {
    hideParts();
    $newPartText.show();
    $newPartSelection.show();
  });

  $('.js-upload-video-link').on('click', function(event) {
    event.preventDefault();
    $newPartVideo.find('.recorder').removeClass('visible');
    $newPartVideo.find('.upload-local').addClass('visible');
  });

  $('.js-shapeshift').shapeshift({
    minColumns: 2,
    gutterX: 20,
    gutterY: 20,
    align: 'left'
  });

  Owl.uploader.on('upload', function(jobURL) {
    console.log('job uploaded', jobURL);

    var xhr;

    xhr = $.ajax({
      url: '/stories/' + storyID + '/parts',
      type: 'POST',
      data: {
        authenticity_token: $('meta[name="csrf-token"]').attr('content'),
        part: {
          media_attributes: {
            type: 'VideoMedia',
            url: jobURL
          }
        }
      }
    });

    xhr.done(function(data) {
      window.location.reload(true);
    });

    xhr.fail(function(err) {
      console.log('fail', err);
    });
  });
});
