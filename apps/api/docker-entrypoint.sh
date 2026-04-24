#!/bin/sh
set -e

./node_modules/.bin/prisma migrate deploy
exec ./node_modules/.bin/pm2-runtime ecosystem.config.cjs