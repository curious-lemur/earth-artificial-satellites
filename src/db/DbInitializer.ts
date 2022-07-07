import { readFile } from 'fs/promises';
import { connect, close } from '../db/db-connection.js';

type readFileResult = [
    error: Error | null,
    data: string | null
]

export default class DbInitializer {
    static async init(): Promise<void> {
        const db = await connect();

        const collections = ['countries', 'satellites'];
        const collectionPromises = collections.map(async (collectionName) => {
            const [error, data]: readFileResult = await this.readDataFromFile(collectionName);

            if (error || data === null) {
                console.error(error);
                return false;
            } else {
                return await this.insertDataIntoDb(db, collectionName, JSON.parse(data));
            }
        });

        await Promise.all(collectionPromises);

        close();
    }

    static async readDataFromFile(collectionName): Promise<readFileResult> {
        const data = await readFile('./data/' + collectionName + '.json', 'utf8');
        if (!data) {
            return [new Error('Error while reading ' + collectionName + '.json file. Data not found.'), null];
        } else {
            return [null, data]
        }
    }

    static async insertDataIntoDb(db, collectionName, data): Promise<boolean> {
        try {
            const collection = db.collection(collectionName);
            const insertResult = await collection.insertMany(data.docs);
            console.log('Successfully inserted documents into ' + collectionName + ' collection');
            return true;
        } catch(err) {
            console.error(new Error('Unable to insert documents into ' + collectionName + ' collection'));
            console.error(err);
            return false;
        }
    }
}