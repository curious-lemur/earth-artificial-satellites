import { graphql, buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    findSatelliteWithCountry(id: ID): SatelliteWithCountry
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
     country: String
   }

   type Country {
     _id: ID!
     docType: String
     name: String
     carrierRockets: [carrierRocket]
     firstSatelliteStartup: [Int]
   }

   type carrierRocket {
     name: String
     description: String
   }

   type firstSatelliteStartup {
     name: String
     date: [Int]
   }

   type CountryWithSatellitesList {
     country: Country
     satellitesList: [Satellite]
   }

   type SatelliteWithCountry {
     satellite: Satellite
     country: Country
   }
 `);

export default schema;
