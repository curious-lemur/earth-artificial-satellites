import EventEmitter from 'events';
import { Db, MongoClient } from 'mongodb';
import config from '../config.js';

const client = new MongoClient(config.dbConnectionUrl, { connectTimeoutMS: 5000 });

export function connect(): Promise<Db> {
    return new Promise((resolve, reject) => {
        client.connect()
        .then((connection) => connection.db(config.dbName))
        .then((db) => {
            console.log('Successfully connected to database');
            resolve(db);
        })
        .catch(reject);

        setTimeout(() => {
            if (!client.db(config.dbName)) {
                const connectionError = new Error('Could not connect to MongoDB');
                console.error(connectionError);
                reject(connectionError);
            }
        }, 5000);
    });
}

export function close(): void {
    client.close(() => { console.log('Connection to database closed') });
}
