import * as Nano from 'nano';
import Config from '../config/config.js';
import { GraphQLScalarType } from 'graphql';

const nano = Nano(Config.connectionUrl);
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

async function findDocumentByID(id) {
  //nano.db.get(doc _id, [params], [callback])
  return await nano.db.get(id);
}

async function findDocuments() {}

async function findDocumentsByKey() {}

const resolvers = {
  Date: dateScalar,
  findDocumentByID,
  findDocuments,
  findDocumentsByKey
};

export default resolvers;
