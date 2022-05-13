import { DocumentGetResponse } from 'nano';
import db from '../../db/db-connection.js';
import { satelliteMangoQuery } from '../../db/mangoQueries.js';

interface Country extends DocumentGetResponse {
  _id: string
  _rev: string
  name?: string
}

export default async function findOneCountry({id, satelliteBookmark}) {
  const country: Country = await db.get(id);
  const satellites = await db.find(satelliteMangoQuery(country.name, satelliteBookmark));
  
  return {
    data: {
      country,
      satellites: satellites.docs,
    },
    bookmark: satellites.bookmark
  };
}
