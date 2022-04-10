import { config } from 'dotenv';
const env = config().parsed;

type ConfigType = {
  address: string,
  port: string,
  database: string,
  dbUsername: string,
  dbPassword: string,
  connectionUrl: string
}

const Config: ConfigType = {
  address: env.ADDRESS || '127.0.0.1',
  port: env.PORT || '5984',
  database: env.DATABASE || 'earth-artificial-satellites',
  dbUsername: env.DB_USERNAME || 'couchdb',
  dbPassword: env.DB_PASSWORD || '',
  get connectionUrl(): string {
    return `http://${this.dbUsername}:${this.dbPassword}@${this.address}:${this.port}/${this.database}`;
  }
}

export default Config;
