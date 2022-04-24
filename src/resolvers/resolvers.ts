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

function findDocumentByID({id}) {
  return db.get(id).then(data => data);
}

function findDocuments() {
  return db.list({include_docs: true}).then(data => {
    return data.rows.map((element) => element.doc);
  });
}

function findDocumentsByKey({key}) {
  return db.fetch({keys: [key]}, (_err, data) => data.rows);
}

const resolvers = {
  Date: dateScalar,
  findDocumentByID,
  findDocuments,
  findDocumentsByKey
};

export default resolvers;
