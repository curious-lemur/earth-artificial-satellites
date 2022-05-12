import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    findSatellites(bookmark: String): SatelliteList
    findCountries(bookmark: String): CountryList
    findOneSatellite: Satellite
  }

  type SatelliteList {
    data: [Satellite]
    bookmark: String
  }

  type CountryList {
    data: [CountryWithSatellites]
    bookmark: String
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
