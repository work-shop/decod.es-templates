"use strict";

var $ = require('jquery');

module.exports = function( options ) {

    require('./overlay.js')( options );
    require('./header.js')( options );
    require('./menu.js')( options );
    require('./search-interface.js')( options );
    require('./fold.js')( options );
    require('./scroll.js')( options );

    //var sh_highlightDocument = require('./highlighter.js');

    try {

        Typekit.load({
            async: true,
            active: function() {
                $(document).trigger('resources-loaded');
                console.log('TypeKit resources loaded.');
                $(window).trigger('scroll');
                sh_highlightDocument();
            },
            inactive: function() {
                $(document).trigger('resources-loaded');
                $(document).trigger('resources-loaded-with-failure');
                console.error('TypeKit load error.');
                sh_highlightDocument();
            }
        });

    } catch(e) {

        console.error('init error.');
        console.error( e.message );

    }

};
