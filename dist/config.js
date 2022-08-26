import { config } from 'dotenv';
var env = config().parsed;
var Config = /** @class */ (function () {
    function Config() {
        if (!env) {
            throw new Error('.env file was not found');
        }
        this.dbLocation = this.getEnvVariable('DB_LOCATION', env);
        this.apiPort = this.getEnvVariable('API_PORT', env);
        this.dbName = this.getEnvVariable('DB_NAME', env);
        this.dbUsername = this.getEnvVariable('DB_USERNAME', env);
        this.dbPassword = this.getEnvVariable('DB_PASSWORD', env);
        switch (this.dbLocation) {
            case 'atlas':
                this.dbConnectionUrl = "mongodb+srv://".concat(this.dbUsername, ":").concat(this.dbPassword, "@cluster0.mvxew.mongodb.net/").concat(this.dbName, "?retryWrites=true&w=majority");
                break;
            case 'local':
                this.dbAddress = this.getEnvVariable('DB_ADDRESS', env);
                this.dbPort = this.getEnvVariable('DB_PORT', env);
                this.dbConnectionUrl = "".concat(this.dbAddress, ":").concat(this.dbPort, "/").concat(this.dbName);
                break;
            default:
                throw new Error('Unknown database location');
        }
    }
    Config.prototype.getEnvVariable = function (varName, envFile) {
        var varValue = envFile[varName];
        if (!varValue) {
            throw new Error(".env variable ".concat(varName, " does not exist or is not valid"));
        }
        else {
            return varValue;
        }
    };
    ;
    return Config;
}());
export default new Config;
