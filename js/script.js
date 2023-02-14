jQuery(function(){

  // Drawer, Hamburger アニメーション
  jQuery('.hamburger-js').click(function(){
    jQuery('.drawer-js').toggleClass('open');
    jQuery('.hamburger-js').toggleClass('open');
  });

  // Header 背景アニメーション
  var height = jQuery(window).height();
  var width = jQuery(window).width();
  var adjust = 0;
  if(width > 1024){
    adjust = -100;
  } else {
    adjust = -60;
  }
  console.log(height);
  jQuery(window).scroll(function(){
    if(jQuery(this).scrollTop() >= height + adjust){
      jQuery('.header-js, .navbar-js, .contactbtn-js, .hamburger-js').addClass('checked');
    } else {
      jQuery('.header-js, .navbar-js, .contactbtn-js, .hamburger-js').removeClass('checked');
    }
  });

  // Scroll アニメーション
  jQuery('.topbtn').click(function(){
    
    let adjust = jQuery('.header').innerHeight();
    let speed = 600;
    let target = jQuery('html');
  
    let position = target.offset().top - adjust;
  
    jQuery('body,html').animate({
      scrollTop: position
    }, speed, 'swing');
    return false;
  
  });

  // Achievement morebtn アニメーション
  jQuery('.morebtn-js span').click(function(){
    let classNames = jQuery(this).parent().attr("class");
    let className = classNames.split('-');
    
    if(jQuery('.' + className[0]).hasClass('open')){
      jQuery(this).html('more');
    } else {
      jQuery(this).html('close');
    }

    jQuery('.' + className[0]).toggleClass('open');
  });
});