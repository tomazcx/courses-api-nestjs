#!/bin/bash

yarn 
yarn build
npx typeorm migration:run -d dist/shared/database/database.providers.js
yarn start:dev
