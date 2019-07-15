#! /bin/sh

export NODE_ENV=development; 

V8_LOGFILE_PATH="$(pwd)logs/v8.log";

echo "In directory $(pwd)"
echo "Starting profiler for Node.JS..."
echo "\tPath for Log: $V8_LOGFILE_PATH"


./node_modules/.bin/nodemon bin/www \
  --track-heap-objects \
  --log-gc \
  --use-strict \
  --gc-stats \
  --logfile $V8_LOGFILE_PATH


