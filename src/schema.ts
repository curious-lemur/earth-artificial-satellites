import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    findSatellites(bookmark: String): SatelliteListResponse
    findCountries(bookmark: String): CountryListResponse
    findOneSatellite(id: ID): Satellite
    findOneCountry(id: ID, satelliteBookmark: String): CountryResponse
  }

  type SatelliteListResponse {
    data: [Satellite]
    bookmark: String
  }

  type CountryListResponse {
    data: [CountryWithSatellites]
    bookmark: String
  }

  type CountryResponse {
    data: CountryWithSatellites
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
