import Nano from 'nano';
import Config from '../config.js';

const nano: Nano.ServerScope = <Nano.ServerScope>Nano(Config.connectionUrl);
const db = nano.use(Config.database);

export default db;
