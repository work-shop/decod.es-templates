"use strict";

var $ = require('jquery');


function ifEscKeyPressedThen( continuation ) {
    return function( e ) {
        if ( e.keyCode === 27 ) {
            continuation( e );
        }
    };
}

function ifSKeyPressedThen( continuation ) {
    return function( e ) {
        if ( e.keyCode === 83 ) {
            continuation( e );
        }
    };
}

module.exports = function( options ) {
    $(document).ready(function() {

        function toggleMenu() {

            if ( $('menu').attr('data-menu-state') === "closed" ) {

                $('menu').fadeIn(250);
                $('menu').attr('data-menu-state', 'open');
                $('[data-header-state]').attr('data-header-state-save', $('[data-header-state]').data('header-state'));
                $('[data-header-state]').attr('data-header-state', 'search');
                $('.menu-toggle').addClass('active');
                $('body').addClass('fixed');
                $('#search-input').focus();
                $(window).off('keyup' );
                $(window).on('keyup', ifEscKeyPressedThen( toggleMenu ) );

            } else {

                $('menu').fadeOut(250);
                $('menu').attr('data-menu-state', 'closed');
                $('[data-header-state]').attr('data-header-state', $('[data-header-state]').data('header-state-save'));
                $(window).trigger('scroll');
                $('.menu-toggle').removeClass('active');
                $('body').removeClass('fixed');
                $(window).off('keyup' );
                $(window).on('keyup', ifSKeyPressedThen( toggleMenu ) );

            }

        }

        $(window).on('keyup', ifSKeyPressedThen( toggleMenu ) );

        $('.menu-toggle').on('click', toggleMenu );
    });
};
