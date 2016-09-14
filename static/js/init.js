"use script";

var $ = require('jquery');

module.exports = function() {

    try {

        Typekit.load({
            async: true,
            active: function() {
                $(document).trigger('resources-loaded');
                console.error('TypeKit resources loaded.');
            },
            inactive: function() {
                $(document).trigger('resources-loaded');
                $(document).trigger('resources-loaded-with-failure');
                console.error('TypeKit load error.');
            }
        });

        console.log('hi');


    } catch(e) {

        console.error('init error.');
        console.error( e.message );

    }

};
