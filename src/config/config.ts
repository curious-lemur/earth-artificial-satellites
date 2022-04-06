const env = require('dotenv').config().parsed;

type ConfigType = {
  address: String,
  port: String,
  database: String,
  dbUsername: String,
  dbPassword: String
}

const Config: ConfigType = {
  address: env.ADDRESS || '127.0.0.1',
  port: env.PORT || '3000',
  database: env.DATABASE || 'earth_artificial_satellites',
  dbUsername: env.DB_USERNAME || 'couchdb',
  dbPassword: env.DB_PASSWORD || ''
}

module.exports = Config;
