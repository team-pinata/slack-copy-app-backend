#/bin/sh

rm -rf src/controllers

docker run --rm \
  -v ${PWD}:/local openapitools/openapi-generator-cli generate \
  -i /local/openapi.yaml \
  -g nodejs-express-server \
  -o /local/src
