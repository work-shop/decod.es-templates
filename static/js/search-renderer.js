"use strict";

var $ = require('jquery');


/**
 * @package decodes-core
 */
function title( name ) {
    return name.replace(/-/g, ' ').replace(/(\b.)+/g, function( x ) { return x.toUpperCase(); } ).trim();
}

/**
 * @package decodes-core
 */
function condense( name ) {
    var uppers = name.split('').filter( function( x ) { return x.toUpperCase() === x; } ).join('');

    return (uppers.length > 1) ? uppers.substring(0,3) : name.substring(0,3);
}




function buildExampleHtml( example ) {

    var name = $('<h3>')
                    .addClass('example-name')
                    .addClass('name')
                    .text( title( example.sourceDocument._name ) )
                    ;

    var parent = $('<p>')
                    .addClass('example-parent-tag')
                    .addClass('parent-tag')
                    .text( title( example.sourceDocument._parent ) );

    var anchor = $('<a>')
                    .attr('href', example.sourceDocument._url )
                    .addClass('block')
                    .append( name )
                    .append( parent )
                    ;

    var wrapper = $('<li>')
                    .addClass('example-search-result')
                    .addClass('search-result')
                    .append(
                        anchor
                    )
                    ;

    return wrapper;

}

function buildDocumentationHtml( documentation ) {

    var icon = $('<div>')
                    .addClass('result-source-icon')
                    .append(
                        $('<span>').text( condense( documentation.sourceDocument._name ) )
                    )
                    ;

    var name = $('<h3>')
                    .addClass('documentation-name')
                    .addClass('name')
                    .text( documentation.sourceDocument._name )
                    ;

    var parent = $('<p>')
                    .addClass('documentation-parent-tag')
                    .addClass('parent-tag')
                    .text( title( documentation.sourceDocument._parent ) );

    var textGroup = $('<div>')
                    .addClass('documentation-result-text')
                    .append( name )
                    .append( parent )
                    ;

    var anchor = $('<a>')
                    .attr('href', documentation.sourceDocument._url )
                    .addClass('block')
                    .append( icon )
                    .append( textGroup )
                    ;

    var wrapper = $('<li>')
                    .addClass('documentation-search-result')
                    .addClass('search-result')
                    .append( anchor )
                    ;

    return wrapper;
}

module.exports = function SearchRenderer( options, exampleRootSelector, documentationRootSelector ) {
    if ( !(this instanceof SearchRenderer) ) { return new SearchRenderer( exampleRootSelector, documentationRootSelector ); }
    var self = this;

    self.renderExampleResult = function( example ) {

        $( exampleRootSelector ).append( buildExampleHtml( example ) );

        return self;

    };

    self.renderDocumentationResult = function( documentation ) {

        $( documentationRootSelector ).append( buildDocumentationHtml( documentation ) );

        return self;

    };

};
