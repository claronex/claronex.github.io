
var flg=0;
/*=================================================================*/


jQuery(document).ready(function() {

	"use strict";	

	/*=================================================================
		//Smooth scroll for menu links - index.html
	===================================================================*/	
	 jQuery('#navibar ul li a[href^="#"],.mobile-nav ul.slimmenu li a[href^="#"], ul.nav li a[href^="#"], a#logo, a.down-arrow,a.scrolldown').on('click', function (e) { 
		e.preventDefault(); 
		var jqBH = jQuery('html,body'); 
		jqBH.unbind("scroll mousedown DOMMouseScroll mousewheel keyup"); 
		jqBH.bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(){ jqBH.stop(true); }); 
		jqBH.stop(true).animate({scrollTop: jQuery(this.hash).offset().top}, 1200, function (){ jqBH.unbind("scroll mousedown DOMMouseScroll mousewheel keyup"); });
		
		$("#menu").stop(true,true).animate({opacity:'0'});
		setTimeout(function(){$("#menu").css("display","none")},800);
		$("#navibar").stop(true,true).animate({width:'50px'});
		flg=0;		
		
	 });
	 
	 /*=================================================================
		//Smooth scroll for menu links - index-menu.html
	===================================================================*/	
	 jQuery('ul.nav li a[href^="#"]').on('click', function (e) { 
		e.preventDefault(); 
		var jqBH = jQuery('html,body'); 
		jqBH.unbind("scroll mousedown DOMMouseScroll mousewheel keyup"); 
		jqBH.bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(){ jqBH.stop(true); }); 
		jqBH.stop(true).animate({scrollTop: jQuery(this.hash).offset().top-60}, 1200, function (){ jqBH.unbind("scroll mousedown DOMMouseScroll mousewheel keyup"); });		
	 });
	 
	 /*=================================================================
	Bootstrap Plugins : Navigation - Collapse (for mobile)
	===================================================================*/ 
	jQuery('.navbar .collapse').collapse();
	jQuery(".navbar-nav li a").click(function() {
		jQuery(".navbar .collapse").toggleClass("in");
	});
	
	/*=================================================================
		Navigation visibility on off
	===================================================================*/	
	$("#navi").hover(function(){
          $("#navih").stop(true,true).animate({top:'-40%',left:'-40%'},130);
          },
          function(){
          $("#navih").stop(true,true).animate({top:'100%',left:'100%'},130);
        });
	
		$(".grid article").hover(function(){
          $("#abhover").stop(true,true).animate({top:'-40%',left:'-40%'},130);
          },
          function(){
          $("#abhover").stop(true,true).animate({top:'100%',left:'100%'},130);
        });
		
	 $("#navi").click(function(){
		if (flg==0){
			$("#navibar").stop(true,true).animate({width:'850px'});
			$("#menu").stop(true,true).animate({opacity:'0.96'});
			$("#menu").css("display","block");
			flg=1;
		}
		else{
			$("#menu").stop(true,true).animate({opacity:'0'});
			setTimeout(function(){$("#menu").css("display","none")},500);
			$("#navibar").stop(true,true).animate({width:'50px'});
			flg=0;
		}
		
	});
	
	$("#menu").click(function(){
            $("#menu").stop(true,true).animate({opacity:'0'});
            setTimeout(function(){$("#menu").css("display","none")},500);
            $("#navibar").stop(true,true).animate({width:'50px'});
            flg=0;
    });
	
	/*=================================================================
		//Mobile Menu 
	===================================================================*/	
	
    $('ul.slimmenu').slimmenu({
        resizeWidth: '1200',
        collapserTitle: 'Springspray',
        easingEffect:'easeInOutQuint',
        animSpeed:'medium',
    });

}); 
