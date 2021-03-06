var config;

function Bitbucket(conf) {
    'use strict';
    config = conf;
}

function create(conf) {
    'use strict';
    return new Bitbucket(conf);
}

module.exports.create = create;

Bitbucket.prototype.post = function(req, res) {
    'use strict';
    var authorizedIps = config.security.authorizedIps;
    var bitbucketIps = config.security.bitbucketIps;
    var commits = req.body.push.changes;
    var ipv4 = req.ip.replace('::ffff:', '');

    if (!(authorizedIps.indexOf(ipv4) >= 0 || bitbucketIps.indexOf(ipv4) >= 0)) {
        console.log('Unauthorized IP:', req.ip);
        res.writeHead(403);
        res.end();
        return;
    }

    if (commits.length <= 0) {
        res.writeHead(204);
        res.end();
        return;
    }

    var commitsFromBranch = commits.filter(function(commit) {
        return commit.new.name === config.repository.branch ||
            commit.new.name === 'refs/heads/master' ||
            commit.new.name === 'refs/heads/develop';
    });

    if (commitsFromBranch.length > 0) {
        console.log('Executing bash file...');
        var executor = require('./../executor').create(config);
        executor.execute(config.action.exec.bitbucket);
    }

    res.writeHead(200);
    res.end();
};
