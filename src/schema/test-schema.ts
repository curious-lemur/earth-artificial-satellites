const createSchema = require('graphql').buildSchema;

// тип, позволяющий обрабатывать запросы
// он описывает резолверы - функции и типы данных, которые они возвращают

let Schema = createSchema(`
  type Query {
    getCountries: [Country]
  }

  type Country {
    name: String
    satellitesList: [Satellite]
  }

  type Satellite {
    name: String
    startup-date: String
  }
`);

module.exports = Schema;
