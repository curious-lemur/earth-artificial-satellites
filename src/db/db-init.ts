import { readFile } from 'fs';
import { promisify } from 'util';
import { connect, close } from './db-connection.js';

class dbInitializer {
    static async init(): Promise<void> {
        const db = await connect();

        const collections = ['countries', 'satellites'];
        const collectionPromises = collections.map(async (collectionName) => {
            const [error, data] = await this.readDataFromFile(collectionName);

            if (error) {
                console.error(error);
                return 'not ok';
            } else {
                return await this.insertDataIntoDb(db, collectionName, JSON.parse(data));
            }
        });

        await Promise.all(collectionPromises);

        close();
    }

    static async readDataFromFile(collectionName): Promise<[Error, string]> {
        const readFileData = promisify(readFile);
        const data = await readFileData('./data/' + collectionName + '.json', 'utf8');
        if (!data) {
            return [new Error('Error while reading ' + collectionName + '.json file. Data not found.'), null];
        } else {
            return [null, data]
        }
    }

    static async insertDataIntoDb(db, collectionName, data): Promise<string> {
        try {
            const collection = db.collection(collectionName);
            const insertResult = await collection.insertMany(data.docs);
            console.log('Successfully inserted documents into ' + collectionName + ' collection');
            return 'ok';
        } catch(err) {
            console.error(err);
            return 'not ok';
        }
    }
}

dbInitializer.init();