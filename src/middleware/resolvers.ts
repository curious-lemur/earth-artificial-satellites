/// < reference path="../types/paging.ts" />
import findSatellites from './resolvers/findSatellites.js';
import findCountries from './resolvers/findCountries.js';

const resolvers = {
  findSatellites,
  findCountries
};

export default resolvers;
