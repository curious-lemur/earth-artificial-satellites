import { config } from 'dotenv';
const env = config().parsed;

type ConfigType = {
  address: string,
  apiPort: string,
  dbPort: string,
  dbUsername: string,
  dbPassword: string,
  database: string,
  connectionUrl: string
}

const Config: ConfigType = {
  address: env.ADDRESS || '127.0.0.1',
  apiPort: env.API_PORT || '3000',
  dbPort: env.DB_PORT || '5984',
  dbUsername: env.DB_USERNAME || 'couchdb',
  dbPassword: env.DB_PASSWORD || '',
  database: env.DATABASE || 'earth-artificial-satellites',
  get connectionUrl(): string {
    return `http://${this.dbUsername}:${this.dbPassword}@${this.address}:${this.port}/${this.database}`;
  }
}

export default Config;
