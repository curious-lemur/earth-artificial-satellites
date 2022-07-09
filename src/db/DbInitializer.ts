import { readFile } from 'fs/promises';
import { connect, close } from '../db/db-connection.js';

type readFileResult = [
    error: Error | null,
    data: string | null
]

export default class DbInitializer {
    static async init(): Promise<void> {
        const db = await connect();
        if (!db) return;

        const collections = ['countries', 'satellites'];
        const collectionPromises = collections.map(async (collectionName) => {
        readFile('./data/' + collectionName + '.json', 'utf8')
            .catch(() => { 
                console.error(new Error(`Unable to read ${collectionName}.json file`));
             })
            .then((data) => {
                if (!data) throw new Error(`Data was not found in ${collectionName}.json file`);
                this.insertDataIntoDb(db, collectionName, JSON.parse(data))
            })
            .catch((err) => console.error(err))
        });

        await Promise.all(collectionPromises);

        close();
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