#!/usr/bin/env sh

node_modules/.bin/phantomjs --webdriver=4444 &> /dev/null &
npm test
killall phantomjs
