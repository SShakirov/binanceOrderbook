export interface IId {
  id: string | number,
}

export interface IPaginationParams {
  page: number,
  size: number,
  total: number,
}

export interface IPagination<T> extends IPaginationParams{
  items: T[],
}

