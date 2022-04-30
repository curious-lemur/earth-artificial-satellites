namespace Paging {
  export interface iParamsForDbQuery {
    limit: number
    offset: number
  }

  export interface iServerParams extends iParamsForDbQuery {
    total_rows: number
  }

  export interface iParamsFromClient {
    toTurnPage: boolean
    total_rows?: number
    offset?: number
  }

  export interface iParamsToClient {
    total_rows: number;
    offset: number;
    canTurnPage: boolean
  }
}
