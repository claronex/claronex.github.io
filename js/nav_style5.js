$(document).ready(function () {
	"use strict";
	
	/* ==============================================
	Navigation visibility control
	=============================================== */
	$(window).scroll(function() {		
		var nT = $(this).scrollTop();			
		if (nT >= 10) {
			$('#header').addClass('scrolled');
		}else {
			$('#header').removeClass('scrolled');				
		}		
	});
	
    // Toggle nav
    $(".nav-container").hover(function () {
        $("nav").stop().fadeIn('fast');
        $('.nav-handle').addClass('active');
    }, function () {
        $("nav").fadeOut('fast');
        $('.nav-handle').removeClass('active');
    });

    $(".nav-container").on('click', '.nav-handle', function () {
        $("nav").fadeToggle('fast');
        $(".nav-handle").toggleClass('active');
    });


});

/* ==============================================
	window on load function
=============================================== */
	
jQuery(window).load(function() {

	'use strict';		
	
	/*=================================================================
	Smooth scroll for menu links
	===================================================================*/       
	jQuery('.nav-container #n5 a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    jQuery('html,body').animate({scrollTop:jQuery(this.hash).offset().top-40}, 1200);
	});
});