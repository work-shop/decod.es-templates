"use strict";

var $ = require('jquery');

function inverse( state ) {
    if ( state !== "open" && state !== "closed" ) { console.error(['Unrecognized State: in fold.js -- inverse: ', state ].join('')); }
    return (state === "open") ? "closed" : "open";
}

function transition( state, selector ) {
    if ( state === "open" ) {

        selector.slideDown();

    } else if ( state === "closed" ) {

        selector.slideUp();

    } else {

        console.error(['Unrecognized State: in fold.js -- transition: ', state ].join(''));

    }
}

function transitionTo( state ) {
    return function( event ) {

        $(this).parent('[data-fold-state]').attr('data-fold-state', state );
        $(this).off( 'click' );
        $(this).on('click', transitionTo( inverse( state ) ) );

        transition( state, $(this).parent('[data-fold-state]').children('.examples-in-section') );

    };
}

module.exports = function( options ) {
    $( document ).ready( function () {

        $('[data-fold-state="open"]').children('.division').on('click', transitionTo('closed') );
        //$('[data-fold-state="closed"]').children('.division').on('click', transitionTo('open') );

    });

};
