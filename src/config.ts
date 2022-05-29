import { config } from 'dotenv';
const env = config().parsed;

class Config {
  dbLocation: string
  apiPort: string
  dbPort?: string
  dbAddress?: string
  dbName: string
  dbUsername: string
  dbPassword: string
  dbConnectionUrl: string

  constructor() {
    this.dbLocation = env.DB_LOCATION || 'atlas';
    this.apiPort = env.API_PORT || '3000';
    this.dbName = env.DBNAME || 'satellites-and-countries';
    this.dbUsername = env.DB_USERNAME || 'admin';
    this.dbPassword = env.DB_PASSWORD || 'admin';

    switch (this.dbLocation) {
      case 'atlas':
        this.dbConnectionUrl = `mongodb+srv://${this.dbUsername}:${this.dbPassword}@cluster0.mvxew.mongodb.net/${this.dbName}?retryWrites=true&w=majority`;
      case 'local':
        this.dbPort = env.DB_PORT || '5000';
        this.dbAddress = env.ADDRESS || '127.0.0.1';
        this.dbConnectionUrl =  `${this.dbAddress}:${this.dbPort}/${this.dbName}`;
      default:
        console.error(new Error('Unknown database location'));
    }
  }
  
}

export default new Config;
