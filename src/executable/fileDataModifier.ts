import { readFile, writeFile } from 'fs/promises';

class FileDataModifier {
    collectionName: string;

    constructor(collectionName) {
        this.collectionName = collectionName;
    }

    async read() {
        return readFile(`./data/${this.collectionName}.json`, 'utf8')
            .catch((err) => { console.error(err) })
            .then((data) => {
                if (data) {
                    console.log(`Read ${this.collectionName} data successfully`);
                    return data;
                } else {
                    throw new Error('No data found in ' + this.collectionName + '.json file')
                }
            })
    }

    parse(data) {
        try {
            return JSON.parse(data); 
        } catch(err) {
            console.error(new Error('Error while parsing file data'));
            console.error(err);
        }
    }

    applyChanges(modification: string, parsedData) {
        return modifications[modification](parsedData);
    }

    async write(changedData) {
        writeFile(`./data/${this.collectionName}-new.json`, JSON.stringify(changedData))
            .then(() => { console.log(`Wrote data to ${this.collectionName}-new.json file successfully`); })
            .catch((err) => {
                console.error(new Error(`Error while writing data to ${this.collectionName}.-new.json file`))
                console.error(err);
            })
    }

    modify(modification: string) {
        this.read()
            .then((data) => this.parse(data))
            .then((parsedData) => this.applyChanges(modification, parsedData))
            .then((changedData) => this.write(changedData));
    }
}


const modifications = {
    'removeAllIdsInCollection': (parsedData) => {
        try {
            if (!parsedData) { throw new Error('parsedData is undefined, so modification is not possible'); }
            return parsedData.docs.map((doc) => { delete doc._id; return doc;});

        } catch(err) { console.error(err) }
    },
    'wrapSatellitesDocumentsIntoDocs': (parsedData) => {
        try {
            return { docs: parsedData }
        } catch(err) { console.error(err) }
    }
}

const fileDataModifier = new FileDataModifier('satellites');
fileDataModifier.modify('wrapSatellitesDocumentsIntoDocs');