import db from '../../db/db-connection.js';

export default async function findOneSatellite({id}) {
  return await db.get(id);
}
