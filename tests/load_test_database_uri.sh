TEST_SERVER_NAME='heroku-test-server'
if command -v heroku >/dev/null && heroku whoami &>/dev/null && heroku apps | grep -q $TEST_SERVER_NAME; then
    rm -f .env.test
    touch .env.test
    heroku config:get DATABASE_URI -s --app $TEST_SERVER_NAME >> .env.test
fi
