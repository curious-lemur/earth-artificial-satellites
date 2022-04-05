const { graphql, buildSchema } = require('graphql');

 const schema = buildSchema(`
   type Satellite {
     "data": {
       "_id": ID
       "name": String
       "tasks": String
       "carrier-rocket": String
       "startup-date": Date
       "flight-duration": Int
       "country": String
       "specifications": type Specifitaions
     }
   }

   type Specifications {
     "mass": Float
     "mission-duration": Int
   }

   type Country {
     "data": {
       "_id": ID
       "name": String
       "satellites-list": [Satellite]
     }
   }
 `);

const country = {
  "name": "Советский Союз",
  "satellites-list": {
    "satellite1": "Спутник 1",
    "satellite2": "Спутник 2"
  }
};
