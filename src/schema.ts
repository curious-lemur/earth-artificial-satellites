import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    findSatellites(limit: Int, skip: Int): [Satellite]
    findCountries(limit: Int, skip: Int): [Country]
    findOneSatellite(id: ID): Satellite
    findOneCountry(id: ID): CountryWithSatellites
  }

  type CountryWithSatellites {
    country: Country
    satellites: [Satellite]
  }

   type Satellite {
     _id: ID!
     docType: String
     name: String
     category: String
     description: String
     tasks: String
     carrierRocket: String
     startupDate: [Int]
     flightDuration: [Int]
     countries: [String]
   }

   type Country {
     _id: ID!
     docType: String
     name: String
     carrierRockets: [CarrierRocket]
     firstSatelliteStartup: FirstSatelliteStartup
   }

   type CarrierRocket {
     name: String
     description: String
   }

   type FirstSatelliteStartup {
     name: String
     date: [Int]
   }
 `);

export default schema;
