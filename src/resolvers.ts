import Nano from 'nano';
import Config from './config.js';
import PageTurner from './middleware/PageTurner.js';
import ResponseToClient from './middleware/ResponseToClient.js';

const nano: Nano.ServerScope = <Nano.ServerScope>Nano(Config.connectionUrl);
const db = nano.use(Config.database);

async function findSatellites({pagingParamsFromClient}) {
  try {
    const pagingParams = PageTurner.createPagingParamsForServer(pagingParamsFromClient);
    const dbQueryResult = await db.view('satellites', 'all-satellites', { include_docs: true, ...pagingParams});

    if (!dbQueryResult) { throw new Error("Documents not found") }

    return new ResponseToClient(dbQueryResult);
  } catch(error) {
    console.log(error);
    return error;
  }
}

const resolvers = {
  findSatellites
}


export default resolvers;
