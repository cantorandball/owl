$(function() {
  var $newPartSelection         = $('.new-part-selection'),
      $newPartSelectionLauncher = $('.js-new-part'),
      $newPartButtons           = $('.js-new-part-buttons'),
      $newPartVideoButton       = $('.js-new-part-video-button'),
      $newPartVideo             = $('.js-new-part-video'),
      storyID                   = $newPartSelection.data('story-id');

  $newPartSelectionLauncher.on('click', function() {
    $newPartVideo.hide();
    $newPartButtons.show();
    $newPartSelection.show();
  });

  $newPartSelection.on('click', function(event) {
    if (!$(event.target).closest('.new-part-selection > div').length) {
      $newPartSelection.hide();
    }
  });

  $newPartVideoButton.on('click', function() {
    $newPartVideo.find('section').removeClass('visible');
    $newPartVideo.find('.recorder').addClass('visible');
    $newPartButtons.hide();
    $newPartVideo.show();
  });


  Owl.uploader.on('upload', function(jobURL) {
    console.log('job uploaded', jobURL);

    var xhr;

    xhr = $.ajax({
      url: '/stories/' + storyID + '/parts',
      type: 'POST',
      data: {
        part: {
          media: {
            type: 'VideoMedia',
            url: jobURL
          }
        }
      }
    });

    xhr.done(function(data) {
      console.log('success', data);
    });

    xhr.fail(function(err) {
      console.log('fail', err);
    });
  });
});
