/// < reference path="./types/paging.ts" />
import Nano from 'nano';
import Config from './config.js';
import PageTurner from './middleware/page-turner.js';

const nano: Nano.ServerScope = <Nano.ServerScope>Nano(Config.connectionUrl);
const db = nano.use(Config.database);

async function findSatellites({pagingParams}) {
  const pageTurner = new PageTurner(pagingParams);

  const queryResult = await db.view('satellites', 'satellite-list', {
    limit: pageTurner.limit, skip: pageTurner.offset
  });

  return {
    data: queryResult.rows,
    pagingParams: {
      ...pageTurner.updateParamsToClient(queryResult.total_rows)
    }
  };
}

const resolvers = {
  findSatellites
}

export default resolvers;
