/// < reference path="PagingParamsTypes.ts" />

namespace PagingParams {
  export class PageTurner {
    static limit = 5;
    static set total_rows(value: number) { this.total_rows = value };
    static set offset(value: number) { this.offset = value };


    static createPagingParams(params: iPagingParamsFromClient): iServerPagingParams {
      if (params.toTurnPage) {
        this.total_rows = params.total_rows;
        this.offset = params.offset + this.limit || params.offset || 0;
      }
      return {
        limit: this.limit,
        total_rows: this.total_rows,
        offset: this.offset
      }
    }

    static defineTurnPageAllowance(params: iDbQueryResultParamsForPaging): boolean {
      return params.offset + this.limit <= params.total_rows;
    }
  }
}

/* 1. получаем первоначальные параметры для запроса
paramsForDbQuery = PageTurner.createPagingParams();

2. после запроса в бд сохраняем total_rows, offset, allowanceToTurnPage

3. в конце, когда генерируем ответ пользователю:
canFetchMoreData: PageTurner.defineTurnPageAllowance(total_rows, rows , offset)
 */
