var $ = require('jquery');

module.exports = function( options ) {
    $(document).on('resources-loaded', function() {
        $('#overlay').fadeOut( options.fadeTiming );
    });
};
