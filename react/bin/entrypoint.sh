#!/bin/sh -e

touch .env
echo "REACT_APP_API_ADDR: $REACT_APP_API_ADDR" > .env

npm run build
npm i -g serve
serve -s build
