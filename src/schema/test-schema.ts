const createSchema = require('graphql').buildSchema;

let Schema = createSchema(`
  type Query {
    getCountries: [Country]
    getSatellitesFromCountries(key: String, value: String): [Satellite]
  }

  type Country {
    collection: String
    name: String
    satellitesList: [Satellite]
  }

  type Satellite {
    collection: String
    name: String
    startupDate: String
  }
`);

module.exports = Schema;
