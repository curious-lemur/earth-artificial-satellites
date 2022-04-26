import Nano from 'nano';
import Config from './config.js';
import { GraphQLScalarType } from 'graphql';

const nano: Nano.ServerScope = <Nano.ServerScope>Nano(Config.connectionUrl);
const db = nano.use(Config.database);

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  }
});

/*function findDocumentByID({id}) {
  return db.get(id).then(data => data);
}

function findDocuments() {
  return db.list({include_docs: true}).then(data => {
    return data.rows.map((element) => element.doc);
  });
}
*/

async function findSatelliteWithCountry(satelliteID) {
  const satellite = await db.get(satelliteID);
  const countryQuery = {
    "selector": {
      "$and": [
        {
          "docType": {
            "$eq": "country"
          }
        },
        {
          "name": {
            "$eq": satellite.country
          }
        }
      ]
    },
    "fields": [
      "name", "carrierRockets", "firstSatelliteStartup"
    ]
  };

  const country = await db.find(countryQuery).then(data => data.docs[0]);
  return {satellite, country};
}

function asyncWrapper(resolver, args) {
  resolver(args).then(data => data);
}

const resolvers = {
  Date: dateScalar,
  //findDocumentByID,
  //findDocuments,
  findSatelliteWithCountry: (args) => { asyncWrapper(findSatelliteWithCountry, args) }
}


export default resolvers;
