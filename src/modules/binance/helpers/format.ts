import { type TSymbolItemFromRequest, type ISymbolItem } from "@/modules/binance/store/types"

export const reformatSymbolInfo = (array: Array<TSymbolItemFromRequest>) => {
  return array.map((item): ISymbolItem => ({
      price: Number(item[0]),
      quantity: Number(item[1]),
      total: (Number(item[0]) * Number(item[1])),
    }))
}