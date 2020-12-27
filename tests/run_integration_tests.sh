#!/usr/bin/env bash

function listen_on_port_5000() {
    COUNTER=$1
    if nc -z localhost 5000; then
        return 0
    else
        if [[ $COUNTER -lt 60 ]]; then
            COUNTER=$(( COUNTER + 1 ))
            sleep 0.5
            listen_on_port_5000 $COUNTER
        else
            return 1
        fi
    fi
}

function run_jest() {
    jest --config tests/integration/jest.config.js
}

function kill_server() {
    SERVER=$(lsof -t -i tcp:5000)
    if [[ -n $SERVER ]]; then
        echo "Stopping Test Server..."
        kill $(lsof -t -i tcp:5000)
        echo "Test Server Stopped"
    fi
}

# ./load_test_database_uri.sh  # Creates .env.test

if test -f .env.test; then
    HEROKU_DATABASE_URI=$(echo "$(< .env.test)" | grep DATABASE_URI)
    if [[ -n $HEROKU_DATABASE_URI ]]; then
        export $HEROKU_DATABASE_URI
    fi
fi

npm start &

if listen_on_port_5000; then
    if run_jest; then
        kill_server && exit 0
    else
        kill_server && exit 1
    fi
else
    echo "Integration test timeout: Unable to listen to port 5000"
    kill_server && exit 1
fi
