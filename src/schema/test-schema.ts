const createSchema = require('graphql').buildSchema;

// тип, позволяющий обрабатывать запросы
// он описывает резолверы - функции и типы данных, которые они возвращают

let Schema = createSchema(`
  type Query {
    getCountries: [Country]
  }

  type Country {
    collection: String
    name: String,
    satellitesList: [Satellite]
  }

  type Satellite {
    collection: String
    name: String
    startupDate: String
  }
`);

module.exports = Schema;
