var config = {};
config.redis = {};

// Ports
config.port_http = 8000;
config.port_https = 4443;

// Redis
config.redis.uri = process.env.DUOSTACK_DB_REDIS || 'localhost';
config.redis.host = 'localhost';
config.redis.port = 6379;

module.exports = config;