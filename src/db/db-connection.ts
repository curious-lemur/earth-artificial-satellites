import { Db, Collection, Document, MongoClient } from 'mongodb';
import config from '../config.js';

const client = new MongoClient(config.dbConnectionUrl);

interface Database extends Db {
    satellites: Collection<Document>
    countries: Collection<Document>
}

export async function connect(): Promise<Database> {
    try {
        await client.connect();
        const database = client.db(config.dbName) as Database;

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

export function close(): void {
    client.close(() => { console.log('Connection to database closed') });
}
