#/bin/sh

docker run --rm \
  -v ${PWD}:/local openapitools/openapi-generator-cli generate \
  -i /local/openapi.yaml \
  -g nodejs-express-server \
  -o /local/src
