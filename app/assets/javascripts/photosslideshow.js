var PhotoPopup = {

  newCommentHtml: '',
  isSetup: false,

  setup: function() {

    if (this.isSetup) {
      console.log('Setup already done, skipping.');
      return;
    }
    var popupDiv = $('<div id="comments-popup"></div>');
    popupDiv.hide().appendTo($('body'));

    $(document).off('submit', '.new_comment').on('submit', '.new_comment', function(event) {
      event.preventDefault();
      const $form = $(this);
      $.ajax({
        type: 'POST',
        url: '/comments',
        data: $form.serialize(),
        dataType: 'json',
        success: function(data) {
          $('#comments-container').html(data.html);
  
          $form[0].reset();
        },
        error: function(xhrObj, textStatus, exception) { 
          console.error('Error saving comment:', exception);
          alert('Error saving comment.');
        }
      });
    });
  
    $(document).off('click', '.btn-danger.delete-comment').on('click', '.btn-danger.delete-comment', function(event) {
      event.preventDefault(); // Prevent default anchor behavior
      event.stopPropagation(); // Stop the event from propagating
      
      var buttondangercontainer = $(this).closest('.btn-danger');
      const commentId = $(buttondangercontainer).data('comment-id');
      console.log('Deleting comment:', commentId);
      $.ajax({
        type: 'DELETE',
        url: '/comments/' + commentId,
        dataType: 'json',
        success: function(data) {
          if (data && data.errors) {
            alert("Failed to delete comment: " + data.errors.join(", "));
          } else {
            location.reload();
            //$('#comments-container').html(data.html);
            //$('#comments-popup').show();
          }
        }
      });
    });

    this.isSetup = true;
  },

  getPhotoInfo: function(photoId, photoUrl, commentsUrl, photoCaption, userEmail) {
    
    console.log('Using URL:', commentsUrl); // Log the URL
    console.log('Caption:', photoCaption); // Log the caption
    console.log('User Email:', userEmail); // Log the user email
    $.ajax({
      type: 'GET',
      url: commentsUrl, 
      dataType: 'html',
      timeout: 5000,
      success: function(data) {
        PhotoPopup.showPhotoInfo(data, photoUrl, photoCaption, photoId, userEmail);
      },
      error: function(xhrObj, textStatus, exception) { 
        alert('Error fetching comments.');
      }
    });
    return false;
  },

  showPhotoInfo: function(data, photoUrl, photoCaption, photoId, userEmail) {
    // Center a floater 1/2 as wide and 1/4 as tall as screen 
    var oneFourth = Math.ceil($(window).width() / 4)
    $('#comments-popup')
      .css({ 
        'left': oneFourth, 
        'width': 2 * oneFourth, 
        'top': 100, 
        'background-color': 'rgba(0, 0, 0, 0.8)', // Set background color to light black (semi-transparent black)
        'color': 'white', // Set text color to white for better readability
        'position': 'fixed',
      })
      .html('<div class="popup-header" style="position: relative; padding: 10px;">' +
        '<h5 style="margin: 0;">Photo Comments</h5>' +
        '<button id="close-comments" type="button" style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: white; font-size: 50px; cursor: pointer;">&times;</button>' +
        '</div>' +
        '<img src="' + photoUrl + '" style="width:50%; display:block; margin: 20px auto 10px auto;">' + 
        '<div class="caption" style="text-align: center; font-size: 20px; margin-top: 10px;">' + photoCaption + '</div>' +
        '<div id="comments-container" style="margin-top: 20px;">' + data + '</div>'  
      )
      .show();
  

    $('.slideshow-container').each(function() {
      var slideshowContainer = $(this);
      PhotoPopup.stopSlideshow(slideshowContainer);
    });
    $('#close-comments').off('click').on('click', PhotoPopup.hidePhotoInfo);

    return false;
  },

  hidePhotoInfo: function() {
    $('#comments-popup').hide();
    $('.slideshow-container').each(function() {
      var slideshowContainer = $(this);
      if (slideshowContainer.is(':hover')) {
        startSlideshow(slideshowContainer);
      }
    });
    return false;
  },

  stopSlideshow: function(container) {
    var slideInterval = $(container).data('slideInterval');
    clearInterval(slideInterval);
    var currentSlideIndex = $(container).find('.slide:visible').index();
    $(container).data('slideIndex', currentSlideIndex);
  }

};



$(document).ready(function() {
  var clickTimer;
  function startSlideshow(container) {
    var slideIndex = 0;
    var slides = $(container).find('.slide').toArray();
    var slideInterval;

    

    function showSlide(index) {
      slides.forEach((slide, i) => {
        $(slide).css('display', i === index ? 'block' : 'none');
      });
    }

    showSlide(slideIndex);

    

    slideInterval = setInterval(function() {
      slideIndex = (slideIndex + 1) % slides.length;
      showSlide(slideIndex);
    }, 3000); 


    $(container).data('slideInterval', slideInterval);
  }

  function stopSlideshow(container) {
    var slideInterval = $(container).data('slideInterval');
    clearInterval(slideInterval);
    var currentSlideIndex = $(container).find('.slide:visible').index();
    $(container).data('slideIndex', currentSlideIndex);
  }

  $(document).on('mouseenter', '.slideshow-container', function() {
    var slideshowContainer = $(this).closest('.slideshow-container');
    var photoPopup = slideshowContainer.find('.photo');
    if (!$('#comments-popup').is(':visible')) {
      photoPopup.css('display', 'block');
      startSlideshow(slideshowContainer);
    }
  });

  $(document).on('mouseleave', '.slideshow-container', function() {
    var slideshowContainer = $(this);
    var photoPopup = slideshowContainer.find('.photo');
    if (!$('#comments-popup').is(':visible')) {
      photoPopup.css('display', 'none');
      stopSlideshow(slideshowContainer);
    }
  });

  $(document).on('click', '.slideshow-container', function() {
    var slideshowContainer = $(this).closest('.slideshow-container');
    clearTimeout(clickTimer);
    clickTimer = setTimeout(function() {
      stopSlideshow(slideshowContainer);
      var currentSlide = slideshowContainer.find('.slide:visible');
      var photoId = currentSlide.find('img.photo-click').data('photo-id');
      var photoUrl = currentSlide.find('img.photo-click').attr('src');
      var commentsUrl = currentSlide.find('img.photo-click').data('url');
      var photoCaption = currentSlide.find('.caption').text();
      var userEmail = currentSlide.find('img.photo-click').data('user-email');
      PhotoPopup.getPhotoInfo(photoId, photoUrl, commentsUrl, photoCaption, userEmail);
    }, 200);
  });

  $(document).on('dblclick', '.slideshow-container', function() {
    clearTimeout(clickTimer);
    var slideshowContainer = $(this).closest('.slideshow-container');
    var currentSlide = slideshowContainer.find('.slide:visible');
    var photoId = currentSlide.find('img.photo-click').data('photo-id');
    var userId = slideshowContainer.data('user-id');
    console.log('User ID:', userId);

    if ($(this).find('img.photo-click').hasClass('recent-user-photo')) {
      if (confirm('Are you sure you want to delete this photo?')) {
        $.ajax({
          type: 'DELETE',
          url: '/users/' + userId + '/photos/' + photoId,
          dataType: 'json',
          success: function(data) {
            if (data.success) {
              alert('Photo deleted successfully.');
              location.reload();
              $('#comments-popup').hide();
              $('.slideshow-container').each(function() {
                startSlideshow($(this));
              });
            } else {
              alert('Failed to delete photo: ' + data.error);
            }
          },
          
          
        });
      }
    } else {
      alert('You can only delete your own photos.');
    }
  });
  

  

  $(document).off('click', '#close-comments').on('click', '#close-comments', function() {
    $('#comments-popup').hide();
    $('.slideshow-container').each(function() {
      startSlideshow($(this));
    });
  });

  

});


$(PhotoPopup.setup);
