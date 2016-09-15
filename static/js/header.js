"use strict";

var $ = require('jquery');

module.exports = function( options ) {

    $(document).ready( function() {

        $( window ).on('scroll', function() {

            console.log($( 'header' ).data('header-state'));

            if ( $( window ).scrollTop() > options.unfixDistance &&
                 $( 'header' ).data('header-state') !== "search" ) {

                $( document ).trigger('header-unfix');

            } else if ( $( 'header' ).data('header-state') !== "search" ) {

                $( document ).trigger('header-fix');

            }
        });


        $( document ).on('header-fix', function() {
            $('[data-header-state="free"]').attr('data-header-state', 'fixed');
        });

        $( document ).on('header-unfix', function() {
            $('[data-header-state="fixed"]').attr('data-header-state', 'free');
        });

        (function() {
            var timeouts = {};

            $('.nav-item').on('mouseover', function() {
                var context = $( this );

                console.log( timeouts );

                if ( typeof timeouts[ context.attr('id') ] !== "undefined" ) {
                    clearTimeout( timeouts[ context.attr('id') ] );
                    timeouts[ context.attr('id') ] = undefined;
                }

                console.log( timeouts );

                context.find('.nav-item-sublist').removeClass('hidden');
            });

            $('.nav-item').on('mouseout', function() {
                var context = $(this);

                timeouts[ context.attr('id') ] = setTimeout( function () {

                    context.find('.nav-item-sublist').addClass('hidden');

                }, options.mouseoutDebounce );

                console.log( timeouts );
            });
        })();

    });
};
