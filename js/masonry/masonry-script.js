jQuery(function() {

  var sp = 767;

  function masonry_execute() {
    var wrapper = jQuery('.js-wrapper');

    if(jQuery('html').width() < sp) {
      wrapper.masonry('destroy');
    } else {
      wrapper.imagesLoaded(function() {
        wrapper.masonry({
          fitWidth: true,
          itemSelector: '.js-item',
          columnWidth: '.js-item',
          gutter: 10,
        });
      });
    }
  }
  masonry_execute();

  jQuery(window).resize(function(){
    masonry_execute();
  });

});