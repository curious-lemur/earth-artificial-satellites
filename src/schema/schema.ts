import { graphql, buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    findDocByID(id: String): String
  }

  scalar Date

  type DateTime {
    created: Date
  }

   type Satellite {
     _id: ID!
     docType: String
     name: String
     category: String
     description: String
     tasks: String
     carrierRocket: String
     startupDate: DateTime
     flightDuration: String
     country: String
   }

   type Country {
     _id: ID!
     docType: String
     name: String
     firstSatelliteStartupDate: DateTime
     satellitesList: [Satellite]
   }
 `);

export default schema;
