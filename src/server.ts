const config = require('./config/config');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { Schema } = require('./schema/schema');

const root = {
  hello: () => {
    return 'Hello World'
  }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(config.PORT);
console.log('Running a GraphQL API server at http://localhost:' + config.PORT + '/graphql');
