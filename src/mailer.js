var Mailgun = require('mailgun').Mailgun;

var Mailer = function() {
    'use strict';

    this.mailgun = new Mailgun('key-3639adbf7081e9e0744b29f0bffea9fc');

    this.sendMessage = function(from, to, subject, message) {
        this.mailgun.sendText(
            from,
            to,
            subject,
            message,
            function(err) {
                console.log(err);
            });
    };
};

module.exports = new Mailer();
