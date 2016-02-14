var Mailgun = require('mailgun').Mailgun;

var config;

var Mailer = function() {
    'use strict';

    this.mailgun = new Mailgun(config.mailer.apiKey);

    this.sendMessage = function(message) {
        this.mailgun.sendText(
            config.mailer.from,
            config.mailer.to,
            config.mailer.subject,
            message,
            function(err) {
                console.log(err);
            });
    };
};

function create(conf) {
    'use strict';

    config = conf;
    return new Mailer();
}


module.exports.create = create;
