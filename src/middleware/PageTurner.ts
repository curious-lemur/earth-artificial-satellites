interface iPagingParamsFromClient {
  toTurnPage: boolean,
  direction?: 'right' | 'left'
  total_rows?: number
  offset?: number
}

interface iServerPagingParams {
  limit: number
  total_rows: number
  offset: number
}

interface iPagingParamsToClient extends iServerPagingParams {
   turnPageAllowance: iTurnPageAllowance
}

interface iTurnPageAllowance {
  left: boolean
  right: boolean
}

interface iDbQueryResultParamsForPaging {
  total_rows: number
  rows: number
  offset: number
}

export default class PageTurner {
  static limit = 5;
  static set offset(value) { this.offset = value };
  static set total_rows(value) { this.total_rows = value };
  static set rowsLength(value) { this.rowsLength = value };
  static set total_rowsLength(value) { this.total_rowsLength = value };

  static set turnPageAllowance(value) { this.turnPageAllowance = value }


  static createPagingParamsForServer(params: iPagingParamsFromClient): iServerPagingParams {
    if (params.toTurnPage) {
      if (params.direction === 'left') { this.turnLeft(params.total_rows, params.offset) }
      else { this.turnRight(params.total_rows, params.offset) }
    }
    return {
      limit: this.limit,
      total_rows: this.total_rows,
      offset: this.offset
    }
  }

  static createPagingParamsForClient(params: iDbQueryResultParamsForPaging): iPagingParamsToClient {
    this.defineTurnPageAllowance(params);
    return {
      limit: this.limit,
      total_rows: this.total_rows,
      offset: this.offset,
      turnPageAllowance: this.turnPageAllowance
    };
  }

  static turnLeft(total_rows, offset): void {
    this.total_rows = total_rows || 0;
    this.offset = offset - this.limit || offset || 0;
  }

  static turnRight(total_rows, offset): void {
    this.total_rows = total_rows;
    this.offset = offset + this.limit || offset || 0;
  }

  static defineTurnPageAllowance(params: iDbQueryResultParamsForPaging): void {
    this.turnPageAllowance = ({
      left: params.offset - this.limit <= 0,
      right: params.offset + this.limit <= params.total_rows
    });
  }
}

/* 1. получаем первоначальные параметры для запроса
paramsForDbQuery = PageTurner.createPagingParams();

2. после запроса в бд сохраняем total_rows, offset, allowanceToTurnPage

3. в конце, когда генерируем ответ пользователю:
pagingParamsToClient: PageTurner.createPaginationParamdForClient(total_rows, rows , offset)
 */
