docker-compose build
docker-compose up

docker stop web2-nodejs
docker stop web2-mongodb
docker stop web2-selenium-chrome
docker stop web2-selenium-firefox

docker-compose down
