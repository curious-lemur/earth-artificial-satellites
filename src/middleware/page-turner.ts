/// < reference path="../types/paging.ts" />
export default class PageTurner {
  limit = 2;
  total_rows = 0;
  offset = 0;

  constructor(params: Paging.iParamsFromClient) {
    const {toTurnPage, offset, total_rows} = params;

    if (toTurnPage) {
      this.offset= (offset + this.limit <= total_rows)
        ? offset + this.limit
        : offset;
    }
  }

  set newTotalRows(value: number) { this.total_rows = value }

  updateParamsToClient(totalRowsFromDbQuery) {
    if (totalRowsFromDbQuery) {
      this.newTotalRows = totalRowsFromDbQuery
    }

    return {
      total_rows: this.total_rows,
      offset: this.offset,
      canTurnPage: this.offset + this.limit <= this.total_rows
    }
  }
}
