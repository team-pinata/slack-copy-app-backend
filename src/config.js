const path = require('path');

const ROOT_DIR = __dirname;
const config = {
  URL_PORT: process.env.PORT || 3000,
};

config.OPENAPI_YAML = path.join(ROOT_DIR, 'api', 'openapi.yaml');
export default config;
