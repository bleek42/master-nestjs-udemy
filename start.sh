#!/bin/sh

if [ "$NODE_ENV" == "production" ] ; then
  npm run start
elif [ "$NODE_ENV" == "test" ] ; then
  npm run start:debug
else
  npm run dev
fi