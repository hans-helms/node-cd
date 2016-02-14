
var config;

var Executor = function() {
    'use strict';

    this.execute = function(line) {
        var exec = require('child_process').exec;
        var message = '';

        var execScript = exec('sh ' + line, function(error, stdout, stderr) {
            if (stdout) {
                // console.log('stdout: ' + stdout);
            }

            if (stderr) {
                // console.log('stderr: ' + stderr);
            }

            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });

        execScript.stdout.on('data', function(data) {
            message += data;
            console.log(data);
        });

        execScript.stderr.on('data', function(data) {
            message += data;
            console.log(data);
        });

        execScript.on('close', function() {
            require('./mailer').create(config).sendMessage(message);
            console.log('closed');
        });
    };
};

var create = function(conf) {
    'use strict';
    config = conf;
    return new Executor();
};

module.exports.create = create;
