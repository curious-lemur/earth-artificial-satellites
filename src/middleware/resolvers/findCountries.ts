import nano from 'nano';
import db from '../../db/db-connection.js';

import { countryMangoQuery, satelliteMangoQuery } from '../../db/mangoQueries.js';

interface Country {
  _id: string
  _rev: string
  name: string
}

export default async function findCountries({bookmark}) {
  const countries = await db.find(countryMangoQuery(bookmark));

  const countriesWithSatellitesPromises = countries.docs.map( async (country: Country) => {
    const satellites = await db.find(satelliteMangoQuery(country.name));
    return { country: country, satellites: satellites.docs };
  });

  const countriesWithSatellites = await Promise.all(countriesWithSatellitesPromises);
  return {
    data: countriesWithSatellites,
    bookmark: countries.bookmark
  }
}
