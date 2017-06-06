jQuery(function ($) {

    'use strict';

    // -------------------------------------------------------------
    // Preloader
    // -------------------------------------------------------------
    (function () {
        $('#status').fadeOut();
        $('#preloader').delay(200).fadeOut('slow');
    }());



    // ------------------------------------------------------------------
    // sticky menu
    // ------------------------------------------------------------------

    (function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() >= 50) {
                $('.navbar').addClass('sticky-nav');
            }
            else {
                $('.navbar').removeClass('sticky-nav');
            }
        });
    }());



    // -------------------------------------------------------------
    // mobile menu
    // -------------------------------------------------------------
    (function () {
        $('button.navbar-toggle').ucOffCanvasMenu({
        documentWrapper: '#main-wrapper',
        contentWrapper : '.content-wrapper',
        position       : 'uc-offcanvas-left',    // class name
        // opener         : 'st-menu-open',            // class name
        effect         : 'slide-along',             // class name
        closeButton    : '#uc-mobile-menu-close-btn',
        menuWrapper    : '.uc-mobile-menu',                 // class name below-pusher
        documentPusher : '.uc-mobile-menu-pusher'
        });
    }());


    // ------------------------------------------------------------------
    // Testimonial Slider
    // ------------------------------------------------------------------
    (function() {
        $('.testimonial').owlCarousel({
            items:2,
            loop: true,
            margin: 30,
            responsiveClass:true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                768:{
                    items:2
                }
            }
        });

        $('.logo-slider').owlCarousel({
            loop: true,
            margin: 30,
            responsiveClass:true,
            responsive: {
                0: {
                    items: 2
                },
                480: {
                    items: 2
                },
                600: {
                    items: 4
                },
                768: {
                    items: 6
                }
            }
        });

    }());



    // ------------------------------------------------------------------
    // jQuery for back to Top
    // ------------------------------------------------------------------
    (function(){

        $('body').append('<div id="totop"><i class="fa fa-angle-up"></i></div>');

            $(window).scroll(function () {
                if ($(this).scrollTop() != 0) {
                    $('#totop').fadeIn();
                } else {
                    $('#totop').fadeOut();
                }
            }); 

        $('#totop').on('click',function(){
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        });

    }());


    // ------------------------------------------------------------------
    // Search Modal
    // ------------------------------------------------------------------

    (function () {
        $('.search-modal,.video-modal').modal({
            backdrop: false,
            show:false
        });

    }());



    // -------------------------------------------------------------
    // Google Map
    // -------------------------------------------------------------

    (function () {

        if ($('#googleMap').length > 0) {

            //set your google maps parameters
            var $latitude = 51.515812, //If you unable to find latitude and longitude of your address. Please visit http://www.latlong.net/convert-address-to-lat-long.html you can easily generate.
                $longitude =  -0.132548,
                $map_zoom = 16; /* ZOOM SETTING */

            //google map custom marker icon
            var $marker_url = 'img/google-map-marker.png';

            //we define here the style of the map
            var style = [{
                "stylers": [{
                    "hue": "#000"
                }, {
                    "saturation": -60
                }, {
                    "gamma": 1.15
                }, {
                    "lightness": -5
                }]
            }];

            //set google map options
            var map_options = {
                center: new google.maps.LatLng($latitude, $longitude),
                zoom: $map_zoom,
                panControl: false,
                zoomControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                styles: style,
            }
            //initialize the map
            var map = new google.maps.Map(document.getElementById('googleMap'), map_options);
            //add a custom marker to the map
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng($latitude, $longitude),
                map: map,
                visible: true,
                icon: $marker_url
            });
        }
    }());


}); // JQuery end




