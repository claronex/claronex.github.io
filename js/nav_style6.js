var windowHeight = jQuery(window).height();	
var windowWidth = jQuery(window).width();
$(document).ready(function () {
	"use strict";
	
	/*=================================================================
	show-hide navigation
	===================================================================*/ 
	var windowOffsetHeight = windowHeight - 1;
	if (!jQuery('header.navbar').hasClass('show')) {
		jQuery(window).scroll(function() {
			if ( jQuery(this).scrollTop() > windowOffsetHeight - 230 ) {
				jQuery('header.navbar').addClass('show');
			}
			else {
				jQuery('header.navbar').removeClass('show');
			}
		});
	};
	
	/*=================================================================
	Bootstrap Plugins : Navigation - Collapse (for mobile)
	===================================================================*/ 
	jQuery('.navbar .collapse').collapse();
	jQuery(".navbar-nav li a").click(function() {
		jQuery(".collapse").toggleClass("in");
	});
	
    
});

/* ==============================================
	window on load function
=============================================== */
	
jQuery(window).load(function() {

	'use strict';		
	// Parallax Backgrounds
		$(window).scroll(function(){
		var scrollAmount = $(window).scrollTop()/2;
		$('#heading-slider-style1').css('padding-bottom', scrollAmount);	
		$('#heading-slider-style1').css('opacity', 1-scrollAmount/2);	
		});	
		
	/*=================================================================
	Smooth scroll for menu links
	===================================================================*/       
	jQuery('.navbar-nav a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    jQuery('html,body').animate({scrollTop:jQuery(this.hash).offset().top-40}, 1200);

	});	
});