export default class PaginationParams {
    rowsPerPage = 5;
    totalRows = 0;
    skip = 0;

    set newTotalRows(value: number) { this.totalRows = value; }
    set newSkip(value: number) { this.skip = value }

    getParams() {
      return {
        limit: this.rowsPerPage + 1,
        skip: this.skip
      }
    }

    update(params) {
      if (params.toTurn) {
        this.chooseDirection(params);
      }
    }

    chooseDirection(params) {
      if (params.direction === 'right') {
        this.getReadyToTurnRight(params);
      } else {
        this.getReadyToTurnLeft(params);
      }
    }

    getReadyToTurnRight(params) {
      if (this.skip + this.rowsPerPage < this.totalRows) {
        this.newSkip = this.skip + this.rowsPerPage;
      }
    }

    getReadyToTurnLeft(params) {
      if (this.skip - this.rowsPerPage >= 0) {
        this.newSkip = this.skip - this.rowsPerPage;
      }
    }
}
