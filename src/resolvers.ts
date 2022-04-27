import Nano from 'nano';
import Config from './config.js';
import PaginationParams from './middleware/PaginationParams.js';

const nano: Nano.ServerScope = <Nano.ServerScope>Nano(Config.connectionUrl);
const db = nano.use(Config.database);

async function findSatellites({turnPageParams}) {
  PaginationParams.update(turnPageParams);
  const newParams = PaginationParams.getParams();
  const result = await db.view('satellites', 'all-satellites', { include_docs: true, ...newParams});

  PaginationParams.newTotalRows = result.total_rows;

  return result.rows || result || new Error('Docs not found');
}

const resolvers = {
  findSatellites
}


export default resolvers;
