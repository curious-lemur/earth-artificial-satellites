import { config, DotenvParseOutput } from 'dotenv';
const env = config().parsed;

class Config {
  dbLocation: string 
  apiPort: string
  dbName: string
  dbUsername: string
  dbPassword: string
  dbAddress: string
  dbPort: string

  dbConnectionUrl: string

  constructor() {

    if (!env) { throw new Error('.env file was not found') }
    this.dbLocation = this.getEnvVariable('DB_LOCATION', env);
    this.apiPort = this.getEnvVariable('API_PORT', env);
    this.dbName = this.getEnvVariable('DB_NAME', env);
    this.dbUsername = this.getEnvVariable('DB_USERNAME', env);
    this.dbPassword = this.getEnvVariable('DB_PASSWORD', env);

    switch (this.dbLocation) {
      case 'atlas':
        this.dbConnectionUrl = `mongodb+srv://${this.dbUsername}:${this.dbPassword}@cluster0.mvxew.mongodb.net/${this.dbName}?retryWrites=true&w=majority`;
        break;
      case 'local':
        this.dbAddress = this.getEnvVariable('DB_ADDRESS', env);
        this.dbPort = this.getEnvVariable('DB_PORT', env);
        this.dbConnectionUrl = `${this.dbAddress}:${this.dbPort}/${this.dbName}`;
        break;
      default:
        throw new Error('Unknown database location');
    }
  }
  
  getEnvVariable(varName: string, envFile: DotenvParseOutput): string { 
    const varValue = envFile[varName];

    if (!varValue) {
      throw new Error(`.env variable ${varName} does not exist or is not valid`);
    } else {
      return varValue;
    }
  };
}

export default new Config;
