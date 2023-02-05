export interface IDepthSnapshotFromRequest {
  asks: Array<TSymbolItemFromRequest>,
  bids: Array<TSymbolItemFromRequest>,
  lastUpdateId: number,
}

export interface IDepthUpdateFromStream{
  E: number,
  U: number,
  a: Array<TSymbolItemFromRequest>,
  b: Array<TSymbolItemFromRequest>,
  e: string,
  s: string,
  u: number,
}

export interface IOrderBook {
  asks: Array<ISymbolItem>,
  bids: Array<ISymbolItem>,
}

export type TSymbolItemFromRequest = [string, string];

export interface ISymbolItem {
  price: number,
  quantity: number,
  total: number,
}


