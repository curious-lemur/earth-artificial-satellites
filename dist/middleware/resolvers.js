import findSatellites from './resolvers/findSatellites.js';
import findCountries from './resolvers/findCountries.js';
import findOneSatellite from './resolvers/findOneSatellite.js';
import findOneCountry from './resolvers/findOneCountry.js';
var resolvers = {
    findSatellites: findSatellites,
    findCountries: findCountries,
    findOneSatellite: findOneSatellite,
    findOneCountry: findOneCountry
};
export default resolvers;
