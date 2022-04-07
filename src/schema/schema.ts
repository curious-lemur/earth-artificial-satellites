const { graphql, buildSchema } = require('graphql');

 const schema = buildSchema(`
   type Satellite {
     data: {
       _id: ID!
       name: String
       tasks: String
       carrierRocket: String
       startupDate: Date
       flightDuration: Int
       country: String
       specifications: type Specifitaions
     }
   }

   type Specifications {
     mass: Float
     missionDuration: Int
   }

   type Country {
     data: {
       _id: ID!
       name: String
       satellitesList: [Satellite]
     }
   }
 `);
