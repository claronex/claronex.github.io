(function ($) {

	'use strict';
	
	/* ==============================================
	Sticky Navbar
	=============================================== */
	$(document).ready(function(){
		$(".navbar").sticky({topSpacing:0});
	});
	
	/* ==============================================
	Auto Close Responsive Navbar on Click
	=============================================== */
	close_toggle();
	$(window).resize(close_toggle); 
	$(".navbar-collapse").css({ maxHeight: $(window).height() - $(".navbar-header").height() + "px" });
	
	/* ==============================================
	Smooth Scroll To Anchor
	=============================================== */
	$(function() {
		$('#main-nav a').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top - 70
			}, 1000);
			event.preventDefault();
		});
	});

	/* ==============================================
	Active Menu Item on Page Scroll
	=============================================== */   
	var sections = $('section')
	  , nav = $('nav')
	  , nav_height = nav.outerHeight();
	 
	$(window).on('scroll', function () {
	  var cur_pos = $(this).scrollTop();
	 
	  sections.each(function() {
		var top = $(this).offset().top - nav_height,
			bottom = top + $(this).outerHeight();
	 
		if (cur_pos >= top && cur_pos <= bottom) {
		  nav.find('a').removeClass('current');
		  sections.removeClass('current');
	 
		  $(this).addClass('current');
		  nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('current');
		}
	  });
	});
}(jQuery));


function close_toggle() {
	if ($(window).width() <= 768) {
	  $('.navbar-collapse a').on('click', function(){
		  $('.navbar-collapse').collapse('hide');
	  });
	}
	else {
	 $('.navbar .navbar-default a').off('click');
	}
}






    



