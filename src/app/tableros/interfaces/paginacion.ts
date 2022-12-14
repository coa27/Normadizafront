import { Tablero } from "./tablero";

export interface Paginacion {
    content: Tablero[]
    pageable: Pageable
    last: boolean
    totalElements: number
    totalPages: number
    size: number
    number: number
    sort: Sort2
    first: boolean
    numberOfElements: number
    empty: boolean
  }

  export interface Pageable {
    sort: Sort
    offset: number
    pageSize: number
    pageNumber: number
    unpaged: boolean
    paged: boolean
  }

  export interface Sort {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }

  export interface Sort2 {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
