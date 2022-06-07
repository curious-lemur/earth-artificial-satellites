import { Db, MongoClient } from 'mongodb';
import config from '../config.js';

export const client = new MongoClient(config.dbConnectionUrl);

export async function connect(): Promise<Db> {
    try {
        await client.connect();
        const database = await client.db(config.dbName);
        if (!database) {
            throw new Error('The database ' + config.dbName + ' does not exist')
        } else {
            console.log('Connected to database successfully');
            return database;
        }
    } catch(err) {
        console.error(err);
    }
}

