import nano from 'nano';
import db from '../../db/db-connection.js';
import PageTurner from '../page-turner.js';



async function findCountries({pagingParams}) {
  const pageTurner = new PageTurner(pagingParams);

  const countries = await db.view('countries', 'country-list', {
    include_docs: true,
    limit: pageTurner.limit,
    skip: pageTurner.offset
  });

  const countriesWithSatellites = countries.rows.map(async (country) => {
    return await fetchSatellitesForCountry(country, pageTurner);
  });

  const response = {
    data: await Promise.all(countriesWithSatellites),
    pagingParams: {
      ...pageTurner.updateParamsToClient(countries.total_rows)
    }
  };
  return response;
}

async function fetchSatellitesForCountry(country, pageTurner) {
  const relatedSatellites = await db.view('satellites', 'satellite-list', {
    include_docs: true,
    key: country.doc.name,
    limit: pageTurner.limit
  });

  return {
    country: country.doc,
    satellites: relatedSatellites.rows.map((satellite) => satellite.doc)
  };
}

export default findCountries;
