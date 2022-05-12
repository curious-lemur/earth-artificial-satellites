import nano from 'nano';
import db from '../../db/db-connection.js';

interface Country {
  _id: string
  _rev: string
  name: string
}

function countryMangoQuery(bookmark) {
  const query: nano.MangoQuery = {
    "selector": {
      "docType": "country"
    },
    "limit": 3
  };

  if (bookmark) { query["bookmark"] = bookmark }
  return query;
}

function satelliteMangoQuery(countryName) {
  const query: nano.MangoQuery = {
    "selector": {
      "$and": [
        { "docType": "satellite" },
        {
          "countries": {
            "$elemMatch": {
              "$eq": countryName
            }
          }
        }
      ]
    },
    "limit": 10
  };

  return query;
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
