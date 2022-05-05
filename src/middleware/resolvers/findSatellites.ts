import db from '../../db/db-connection.js';
import PageTurner from '../page-turner.js';

async function findSatellites({pagingParams}) {
  const pageTurner = new PageTurner(pagingParams);

  const queryResult = await db.view('satellites', 'satellite-list', {
    include_docs: true,
    limit: pageTurner.limit,
    skip: pageTurner.offset
  });

  const response = {
    data: queryResult.rows.map((satellite) => satellite.doc),
    pagingParams: {
      ...pageTurner.updateParamsToClient(queryResult.total_rows)
    }
  };
  return response;
}

export default findSatellites;
