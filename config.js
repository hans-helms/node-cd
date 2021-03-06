var Private = {
    server: {
        port: '61440'
    }, // Port is overriden by env var 'WWW_PORT'
    security: {
        authorizedIps: [
            '127.0.0.1',
            'localhost',
            '80.101.82.159'
        ],
        bitbucketIps: [
            '131.103.20.160',
            '131.103.20.27',
            '131.103.20.165',
            '165.254.145.0',
            '165.254.145.26',
            '104.192.143.0',
            '104.192.143.24',
            '104.192.143.193',
            '80.101.82.159'
        ],
        githubIps: [
            '207.97.227.253',
            '50.57.128.197',
            '204.232.175.75',
            '108.171.174.178'
        ],
        githubAuthorizedSubnets: [
            '204.232.175.64/27',
            '192.30.252.0/22'
        ]
    },
    repository: {
        branch: 'master'
    },
    action: {
        exec: {
            github: './github.sh',
            bitbucket: './bitbucket.sh',
            contentful: './contentful.sh'
        }
    },
    mailer: {
        apiKey: 'key-3639adbf7081e9e0744b29f0bffea9fc',
        from: 'hans.helms@gmail.com',
        to: ['hans.helms@gmail.com'],
        subject: 'OTP automatic build',
        errorPattern: ''

    }
};

module.exports = Private;