'use strict';

var fs = require('fs');
var path = require('path');

var dataPath = path.join(__dirname, 'data');

function log(stuff) {
    console.log(stuff);
}

fs.readdir(dataPath, function(err, files) {
    if (err) {
        log('Directory read failure');
    }

    files.forEach(function(file) {
        var stream = fs.createReadStream(path.join(__dirname, 'data', file)),
            last = '';

        stream.on('data', function(chunk) {
            var data = chunk.toString(),
                lines;

            if (data[data.length - 1] !== '\n') {
                lines = data.split(/\n/);

                lines[0] = last + lines[0];

                last = lines[lines.length - 1];

                lines.length = lines.length - 1;
            } else {
                lines = data.split(/\n/);

                lines[0] = last + lines[0];

                last = '';
            }

            lines.forEach(function(line) {
                var reg = /(http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/;
            });
        });

        stream.on('end', function() {
            log('done');
        });

        stream.on('error', function() {
            log('problem');
        });

//        stream.close();
    });
});
