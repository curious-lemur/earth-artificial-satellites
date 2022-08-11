import { connect, close } from '../../db/db-connection.js';

export default async function findSatellites({limit, skip}) {
    const db = await connect();

    const data = await db.collection('satellites').find().skip(skip).limit(limit).toArray();
    close();
    return data;
}
