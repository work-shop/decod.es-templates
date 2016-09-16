"use strict";

var $ = require('jquery');

module.exports = function( options ) {
    $(document).ready( function() {
        $('a[href^="#"]').on('click', function( e ) {
            e.preventDefault();

            var target = $( $(this).attr('href') );

            var elementHeight = target.height();
            var elementScrollTop = target.offset().top;
            var offset = (window.innerHeight - elementHeight) / 2;

            $('html, body').animate({scrollTop: [elementScrollTop - offset, "px"].join('') });

        });
    });

};
