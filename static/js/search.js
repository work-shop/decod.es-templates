"use strict";

var lunr = require('lunr');
var walk = require('object-walk');


function walkDataTree( data, isTerminal ) {

    var documents = [];

    walk( data, function( val, prop, object ) {

        if ( isTerminal( val, prop ) ) {

            val._parent = object._name;

            documents.push( val );

        }

    });

    return documents;
}

function label( x, i ) { x.cid = i; return x; }

module.exports = function Searcher( data, options ) {
    if ( !( this instanceof Searcher ) ) { return new Searcher( data ); }
    var self = this;


    function formatDocumentationAsDocument( documentation ) {

        var references = [];
        var body = [];

        if ( typeof documentation.references !== "undefined" && typeof documentation.references.classes !== "undefined" ) {
            walk( documentation.references.classes, function( val, prop, obj ) {
                references.push( prop );
            })
        }

        if ( typeof documentation.references !== "undefined" && typeof documentation.references.functions !== "undefined" ) {
            walk( documentation.references.functions, function( val, prop, obj ) {
                references.push( prop );
            })
        }

        if ( typeof documentation.definitions !== "undefined" ) {
            documentation.definitions.forEach( function( definition ) {
                if ( typeof definition.code !== "undefined" ) {
                    body.push( definition.code.join('\n') );
                }
            });
        }

        references.push( documentation._parent );

        return {
            sourceDocument: documentation,
            title: documentation._name,
            tags: references,
            body: body.join('\n'),
            type: "documentation"
        };
    }

    function formatExampleAsDocument( example ) {

        var references = [];
        var body = [];

        for ( var section in example ) {
            if ( example.hasOwnProperty( section ) && options.ignoredKeys.indexOf( section ) === -1 ) {

                if ( typeof example[section].references !== "undefined" && typeof example[section].references.classes !== "undefined" ) {
                    walk( example[section].references.classes, function( val, prop, obj ) {
                        references.push( prop );
                    });
                }

                if ( typeof example[section].documentation !== "undefined" && typeof example[section].documentation.description !== "undefined" ) {
                    body.push( example[section].documentation.description.join('\n') );
                }

                if ( typeof example[section].blocks !== "undefined" ) {
                    example[section].blocks.forEach( function( block ) {
                        body.push( block.description );
                    });
                }
            }
        }

        references.push( example._parent );

        return {
            sourceDocument: example,
            title: example._name,
            tags: references,
            body: body.join('\n'),
            type: 'example'
        };

    }

    function isTerminalDocumentationObject( value ) {
        if ( typeof value !== "object" ) { return false; }

        return typeof value._id !== "undefined" && typeof value._modified !== "undefined";

    }

    function isTerminalExampleObject( value ) {

        if ( typeof value !== "object" ) { return false; }

        var isTerminal = true;

        for ( var key in value ) {
            if ( isTerminal && value.hasOwnProperty( key ) && options.ignoredKeys.indexOf( key ) === -1 ) {
                isTerminal = typeof value[ key ]._id !== "undefined" && typeof value[ key ]._modified !== "undefined";

                if ( !isTerminal ) { break; }

            }
        }

        return isTerminal;
    }

    var examples = walkDataTree( data.examples, isTerminalExampleObject ).map( formatExampleAsDocument );
    var documentation = walkDataTree( data.decodes, isTerminalDocumentationObject ).map( formatDocumentationAsDocument );
    var documents = examples.concat( documentation ).map( label );

    var index = lunr( function() {
        this.field('title', {boost: 10});
        this.field('tags', {boost: 100});
        this.field('body');
        this.ref( 'cid' );
    });

    documents.forEach( function( doc ) { index.add( doc ); } );

    self.search = function( string ) {
        return index.search( string ).map( function( result ) {

            console.log( result );

            return documents[ result.ref ];
        });
    };

};
