import Config from './config.js';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema.js';
import resolvers from './resolvers.js';

const root = {
    ...resolvers
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(Config.apiPort);
console.log('Running a GraphQL API at http://localhost:' + Config.apiPort + '/graphql');
