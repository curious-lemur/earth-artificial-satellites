import Nano from 'nano';
import Config from '../config/config.js';
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

async function findDocumentByID(id: string) {
  //nano.db.get(doc _id, [params], [callback])
  let temporaryId = '8b4ee84640ce8787f74a1b1456024c30';
  return await db.get(temporaryId);
}

async function findDocuments() {
  return await db.fetch({keys: ['спутник']})
}

async function findDocumentsByKey() {}

const resolvers = {
  Date: dateScalar,
  findDocumentByID,
  findDocuments,
  findDocumentsByKey
};

export default resolvers;
