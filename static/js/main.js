require('./init.js')({
    fadeTiming: 350,
    unfixDistance: 100,
    mouseoutDebounce: 90,
    database: data,
    ignoredKeys: ['_url', '_name'],
    minQueryLength: 2,
    minimumOffset: 50
});
