import { MongoClient } from 'mongodb';
import config from '../config.js';
var client = new MongoClient(config.dbConnectionUrl, { connectTimeoutMS: 5000 });
export function connect() {
    return new Promise(function (resolve, reject) {
        client.connect()
            .then(function (connection) { return connection.db(config.dbName); })
            .then(function (db) {
            console.log('Successfully connected to database');
            resolve(db);
        })
            .catch(reject);
        setTimeout(function () {
            if (!client.db(config.dbName)) {
                var connectionError = new Error('Could not connect to MongoDB');
                console.error(connectionError);
                reject(connectionError);
            }
        }, 5000);
    });
}
export function close() {
    client.close(function () { console.log('Connection to database closed'); });
}
