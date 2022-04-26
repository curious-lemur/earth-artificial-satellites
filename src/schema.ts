import { graphql, buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    findDocumentByID(id: String): Satellite
    findDocuments: [Satellite]
    findSatelliteWithCountry(satelliteID: ID): SatelliteWithCountry
  }

  scalar Date

   type Satellite {
     _id: ID!
     _rev: String
     docType: String
     name: String
     category: String
     description: String
     tasks: String
     carrierRocket: String
     startupDate: Date
     flightDuration: String
     country: String
   }

   type Country {
     _id: ID!
     _rev: String
     docType: String
     name: String
     carrierRockets: [carrierRocket]
     firstSatelliteStartup: Date
   }

   type carrierRocket {
     name: String
     description: String
   }

   type firstSatelliteStartup {
     name: String
     date: Date
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
