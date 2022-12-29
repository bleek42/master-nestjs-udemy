#!/usr/bin/env sh

case "${NODE_ENV}" in
"production")
  eval "$(npm run start:prod)"
  ;;
"test")
  eval "$(npm run start:debug)"
  ;;
"development")
  eval "$(npm run start:dev)"
  ;;
esac
