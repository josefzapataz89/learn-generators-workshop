'use strict'

var fs = require('fs');

function run(generator) {
    var it = generator(go);
    
    function go (err, result) {
        if (err)
            return it.throw(err);

        it.next(result);
    }

    go();
}

run(function* (done) {
    // catch exception
    var firstFile;

    try {
        var dirFiles = yield fs.readdir('NoNoNoNo', done); // No such dir
        firstFile = dirFiles[0]; // TypeError: Cannot read property '0' of undefined
    } catch (error) {
        firstFile = null;
    }
    
    console.log(firstFile);
});
