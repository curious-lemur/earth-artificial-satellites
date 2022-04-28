import Nano from 'nano';
import Config from './config.js';
import { PageTurner, iPagingParamsToClient } from './middleware/PageTurner.js';

const nano: Nano.ServerScope = <Nano.ServerScope>Nano(Config.connectionUrl);
const db = nano.use(Config.database);

interface iResponse {
  data: any

}

async function findSatellites({pagingParamsFromClient}) {
  try {
    const pagingParams = PageTurner.createPagingParamsForServer(pagingParamsFromClient);
    const dbQueryResult = await db.view('satellites', 'all-satellites', { include_docs: true, ...pagingParams});

    if (!dbQueryResult) { throw new Error("Documents not found") }

    const { total_rows, offset } = dbQueryResult;

    return {
      data: dbQueryResult.rows || dbQueryResult,
      total_rows,
      offset,
      // add turn page allowance
    };
  } catch(error) {
    console.log(error);
    return error;
  }
}

const resolvers = {
  findSatellites
}


export default resolvers;
