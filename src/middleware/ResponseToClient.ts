import { PageTurner } from './PageTurner.js';

interface iResponseToClient {
  data: any
  total_rows: number
  offset: number
  canFetchMoreData: boolean
}


export default class ResponseToClient implements iResponseToClient {
  data: any;
  total_rows: number;
  offset: number;
  canFetchMoreData: boolean

  constructor(dbQueryResult) {
    this.data = dbQueryResult.rows;
    this.total_rows = dbQueryResult.total_rows;
    this.offset = dbQueryResult.offset;
    this.canFetchMoreData = PageTurner.defineTurnPageAllowance({total_rows: this.total_rows, rows: dbQueryResult.rows, offset: this.offset})
  }
}
