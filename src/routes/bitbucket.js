var config

function Bitbucket(conf) {
    config = conf
}

function create(conf) {
    return new Bitbucket(conf)
}

module.exports.create = create

Bitbucket.prototype.post = function(req, res) {
    var authorizedIps = config.security.authorizedIps
    var bitbucketIps = config.security.bitbucketIps
    var commits = req.body.push.changes
    var ipv4 = req.ip.replace('::ffff:', '')

    if (!(authorizedIps.indexOf(ipv4) >= 0 || bitbucketIps.indexOf(ipv4) >= 0)) {
        console.log('Unauthorized IP:', req.ip)
        res.writeHead(403)
        res.end()
        return
    }

    if (commits.length <= 0) {
        res.writeHead(204)
        res.end()
        return
    }

    var commitsFromBranch = commits.filter(function(commit) {
        return commit.new.name === config.repository.branch ||
            commit.new.name === 'refs/heads/master' ||
            commit.new.name === 'refs/heads/develop'
    })

    if (commitsFromBranch.length > 0) {
        console.log('Executing bash file...')
        myExec(config.action.exec.bitbucket)
    }

    res.writeHead(200)
    res.end()
}

var myExec = function(line) {
    
    // var spawn = require('child_process').spawn;
    // var _ = require('underscore'); // for some utility goodness

    // var deploySh = spawn('sh', [ line ], {
    //   cwd: process.env.HOME,
    //   env: process.env
    // });


    var exec = require('child_process').exec

    var execScript = execSync('sh ' + line, function(error, stdout, stderr) {
        console.log('stdout: ' + stdout)
        console.log('stderr: ' + stderr)
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });

    execScript.on('data', function(data){
      console.log('data: ', data);

    });

    execScript.on('close', function(code){
      console.log('close: ', code);
      execScript.exit(99);

    });


}
















