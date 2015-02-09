var windowHeight = jQuery(window).height();	
var windowWidth = jQuery(window).width();
var fadeShowTimeouts = [];

$.fn.slideFadeShow  = function(speed, easing, callback) {
  var $this = this;
  for (var i=0; i<fadeShowTimeouts.length; i++) {
    clearTimeout(fadeShowTimeouts[i]);
  }
  if(!this.is(':animated') && !this.hasClass('closing') && !this.hasClass('opening') && !this.hasClass('opened')){
    $this.removeClass('closing').removeClass('closed').removeClass('opened').addClass('opening');
    $this.animate({height: 'toggle'}, speed, easing, callback);
    $this.children('li').each(function(index,item){
      var $submenu_entry = $(this);
      setTimeout(function(){ if(!$this.hasClass('closing')){ $submenu_entry.addClass('opaque'); } }, (120+(index*120)));
    });
    setTimeout(function(){ $this.removeClass('opening').addClass('opened'); }, 120+($this.children('li').length*120));
  }else{
    fadeShowTimeouts.push(setTimeout(function(){ $this.slideFadeShow(speed, easing, callback); }, 240+($this.children('li').length*120)));
  }
};
$.fn.slideFadeHide  = function(speed, easing, callback) {
  var $this = this;
  for (var i=0; i<fadeShowTimeouts.length; i++) {
    clearTimeout(fadeShowTimeouts[i]);
  }
  if(!this.is(':animated') && !this.hasClass('opening') && !this.hasClass('closing') && !this.hasClass('closed')){
    $this.removeClass('opening').removeClass('opened').removeClass('closed').addClass('closing');  
    $this.children('li').each(function(index,item){
      var $submenu_entry = $(this);
      var multiplier = $this.children('li').length-1-index;
      setTimeout(function(){ if(!$this.hasClass('opening')){ $submenu_entry.removeClass('opaque'); } }, (120+(multiplier*120)));
    });
    var postHandler = function(){
      $(this).removeClass('closing').addClass('closed');
      $(this).children('li').removeClass('opaque');
      if(typeof(callback)==='function'){
        callback();
      }
    };
    setTimeout(function(){ $this.animate({height: 'toggle'}, speed, easing, postHandler); }, 420+($this.children('li').length*120));
  }else{
    fadeShowTimeouts.push(setTimeout(function(){ $this.slideFadeHide(speed, easing, callback); }, 240+($this.children('li').length*120)));
  }
};


jQuery(document).ready(function(){
	"use strict";
	

	jQuery('#options ul li').hover(function() {
		jQuery(this).find('ul').slideFadeShow();
	}, function(){
    jQuery(this).find('ul').slideFadeHide();
  });
  
  /*=================================================================
	show-hide navigation
	===================================================================*/ 
	var windowOffsetHeight = windowHeight - 1;
	if (!jQuery('header.navstyle7').hasClass('show')) {
		jQuery(window).scroll(function() {
			if ( jQuery(this).scrollTop() > windowOffsetHeight/2 - 230 ) {
				jQuery('header.navstyle7').addClass('resetnav');
			}
			else {
				jQuery('header.navstyle7').removeClass('resetnav');
			}
		});
	};

	/*=================================================================
	Smooth scroll for menu links
	===================================================================*/       
	jQuery('#options ul li a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    jQuery('html,body').animate({scrollTop:jQuery(this.hash).offset().top-100}, 1200);

	});	

	
});	