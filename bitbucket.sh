
#!/bin/sh
echo "starting bitbucket.sh"

GIT_WORK_TREE=~/web/gtp.net/
cd $GIT_WORK_TREE


git fetch origin
reslog=$(git log HEAD..origin/master --oneline)

if [ "${reslog}" != "" ] ; then
 echo "pulling changes from the server"

    #stop the server
    pm2 stop ./server.js
    
    git fetch --all

    git reset --hard origin/master
    
    gulp clear-database

    gulp update-database
    
    npm install
    
    pm2 start ./server.js


else
 echo "no git changes"
fi
