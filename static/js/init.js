var $ = require('jquery');

module.exports = function( options ) {

    require('./overlay.js')( options );
    require('./header.js')( options );

    try {

        Typekit.load({
            async: true,
            active: function() {
                $(document).trigger('resources-loaded');
                console.log('TypeKit resources loaded.');
            },
            inactive: function() {
                $(document).trigger('resources-loaded');
                $(document).trigger('resources-loaded-with-failure');
                console.error('TypeKit load error.');
            }
        });

    } catch(e) {

        console.error('init error.');
        console.error( e.message );

    }

};
