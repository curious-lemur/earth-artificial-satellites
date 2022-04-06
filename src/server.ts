const config = require('./config/config');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const testSchema = require('./schema/test-schema');

// сам graphql api, реализующий разные резолверы, описанные в type query
// чтобы обрабатывать запросы, нужно описать type query в схеме
const root = {
  hello: () => {
    return 'Hello World'
  }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: testSchema,
  rootValue: root,
  graphiql: true
}));

app.listen(config.port);
console.log('Running a GraphQL API server at http://localhost:' + config.port + '/graphql');
