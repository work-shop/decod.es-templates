"use strict";

var $ = require('jquery');
var Searcher = require('./search.js');
var Renderer = require('./search-renderer.js');

var exampleRootSelector = '#examples-results-field',
    documentationRootSelector = '#documentation-results-field';

module.exports = function( options ) {

    var index = new Searcher( options.database, options );
    var renderer = new Renderer( options, exampleRootSelector, documentationRootSelector );

    $( document ).ready( function() {

        $('#search-input').on('keyup', function( e ) {

            var query = $('#search-input').val();

            if ( query.length > options.minQueryLength ) {

                $( exampleRootSelector ).html('');
                $( documentationRootSelector ).html('');

                index.search( query ).forEach( function( result ) {

                    if ( result.type === "example" ) {

                        renderer.renderExampleResult( result );

                    } else if ( result.type === "documentation" ) {

                        renderer.renderDocumentationResult( result );

                    } else {

                        console.error('unexpected result type"' + result.type + '" encountered in search.');

                    }

                });

            }

        });

    })

};
