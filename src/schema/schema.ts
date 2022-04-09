const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
   type Satellite {
     data: {
       _id: ID!
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
   }

   type Country {
     data: {
       _id: ID!
       docType: String
       name: String
       firstSatelliteStartupDate: Date
       satellitesList: [Satellite]
     }
   }
 `);

export default schema;
