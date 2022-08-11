import { connect, close } from '../../db/db-connection.js';

export default async function findCountries({skip, limit}) {
    const db = await connect();
    
    const data = await db.collection('countries').find().skip(skip).limit(limit).toArray();
    close();
    return data;
}