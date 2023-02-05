import { type IOrderBook, type ISymbolItem } from "@/modules/binance/store/types"

export interface ITextParameters {
  text: string | number,
  color?: string,
  weight?: string,
}

export interface IColumnStruct{
  columnName: string,
  getTextParameters: TTextFunctions,
  position?: string,
  toFixedIndex?: number
}

type TTextFunctions = (order: number, type: keyof IOrderBook, item: ISymbolItem) => ITextParameters;