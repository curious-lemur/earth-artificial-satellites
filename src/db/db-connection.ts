import { Db, MongoClient } from 'mongodb';
import config from '../config.js';

const client = new MongoClient(config.dbConnectionUrl);

async function connect(): Promise<Db> {
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
    } finally {
        await client.close();
    }
}

export default connect;
