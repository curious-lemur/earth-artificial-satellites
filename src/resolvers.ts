import Nano from 'nano';
import Config from './config.js';

const nano: Nano.ServerScope = <Nano.ServerScope>Nano(Config.connectionUrl);
const db = nano.use(Config.database);

async function findSatellites() {
  const result = await db.view('satellites', 'all-satellites', { include_docs: true, limit: 5 });
  return result.rows || result || new Error('Docs not found');
}

const resolvers = {
  findSatellites
}


export default resolvers;
