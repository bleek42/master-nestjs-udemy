#!/usr/bin/env sh

case "${NODE_ENV}" in
production)
  printf "Docker/Nest.js in prod-env: NODE_ENV = %s\n" "$NODE_ENV"
  printf "running app with npm run start:prod... \n"
  eval "$(npm run start:prod)"
  ;;
test)
  printf "Docker/Nest.js in test-env: NODE_ENV = %s\n" "$NODE_ENV"
  printf "running app with npm run test:watch... \n"
  eval "$(npm run test:watch)"
  ;;
development)
  printf "Docker/Nest.js in devel-env: NODE_ENV = %s\n" "$NODE_ENV"
  printf "running app with npm run start:dev... \n"
  eval "$(npm run start:dev)"
  ;;
debug)
  printf "Docker/Nest.js in devel-env: NODE_ENV = %s\n" "$NODE_ENV"
  printf "running app with npm run start:debug... \n"
  eval "$(npm run start:debug)"
  ;;
*)
  printf "Docker/Nest.js is unknown-env, NODE_ENV = null/undefined \n"
  printf "running app with npm start... \n"
  eval "$(npm start)"
  ;;
esac
