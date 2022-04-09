import * as Nano from 'nano';
import Config from '../config/config';

const connectionUrl = `http://${Config.dbUsername}:${Config.dbPassword}@${Config.address}:${Config.port}/${Config.database}`;
const nano = Nano(connectionUrl);

export function getDocumentById() {
  //nano.db.get(doc _id, [params], [callback])
  return nano.db.list()
}

export function getDocuments() {}

export function findDocumentByKey() {}
