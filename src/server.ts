import Config from './config/config';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';
import { postDocument } from './db/db-queries';

const root = {
  postDocument: () => {
    postDocument();
  }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(Config.port);
console.log('Running a GraphQL API at http://localhost:' + Config.port + '/graphql');
