#!/bin/bash

pushd .
cd src
mv tsconfig.json tsconfig.json.save
cp tsconfig.json.webdist tsconfig.json
tsc -m system -d -p ./
rm tsconfig.json
mv tsconfig.json.save tsconfig.json
tsc -d -p ./
popd

mkdir dist/systemjs
cp node_modules/systemjs/dist/system.js dist/systemjs

