echo "wait db server"
dockerize -wait tcp://mysql:3306 -timeout 60s

echo "start node server"
npm run start
