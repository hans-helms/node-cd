var mailer = require('./mailer');

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

        execScript.on('close', function(code) {
            mailer.sendMessage('hans.helms@gmail.com', ['hans.helms@gmail.com'], 'mailgun test', message);
            console.log(code);
        });
    };
};

module.exports = new Executor();
