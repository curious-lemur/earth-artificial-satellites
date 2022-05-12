import db from '../../db/db-connection.js';

async function findSatellites({bookmark}) {
  const mangoQuery = {
    "selector": {
      "docType": "satellite"
    },
    "limit": 10
  };

  if (bookmark) { mangoQuery["bookmark"] = bookmark }

  const dbResponse = await db.find(mangoQuery);

  return {
    data: dbResponse.docs,
    bookmark: dbResponse.bookmark
  };
}

export default findSatellites;
