import { Db, MongoClient } from 'mongodb';
import config from '../config.js';

const client = new MongoClient(config.dbConnectionUrl);

async function connect(): Promise<Db> {
    try {
        await client.connect();

        return client.db('satellites-and-countries')
    } catch(err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

export default connect;
