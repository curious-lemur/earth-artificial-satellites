import { graphql, buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    findDocumentByID(id: String): Satellite
    findDocuments: [Satellite]
    findDocumentsByKey(key: String): [Satellite]
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
 `);

export default schema;
