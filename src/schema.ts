import { graphql, buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    findSatellites(turnPageParams: TurnPageParams): [Satellite]
  }

  type TurnPageParams {
    toTurnPage: Boolean
    direction: String
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
