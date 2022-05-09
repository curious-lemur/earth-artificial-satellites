import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    findSatellites(pagingParams: PagingParamsInput): SatelliteList
    findCountries(pagingParams: PagingParamsInput): CountryList
  }

  input PagingParamsInput {
    toTurnPage: Boolean!
    total_rows: Int
    offset: Int
  }

  type PagingParamsType {
    canTurnPage: Boolean!
    total_rows: Int!
    offset: Int!
  }

  type SatelliteList {
    data: [SatelliteWithCountries]
    pagingParams: PagingParamsType
  }

  type CountryList {
    data: [CountryWithSatellites]
    pagingParams: PagingParamsType
  }

  type SatelliteWithCountries {
    satellite: Satellite
    countries: [Country]
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
