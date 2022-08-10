import { connect, close } from '../../db/db-connection.js'; 
import { convertToObjectId } from '../convertToObjectId.js';

export default async function findOneSatellite({id}) {
  const db = await connect();
  const convertedId = convertToObjectId(id);

  const data = await db.collection('satellites').findOne({ _id: convertedId });

  close();
  return data;
}
