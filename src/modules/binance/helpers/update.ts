import { type IOrderBook, type ISymbolItem } from './../store/types';

export const updateOrderbook = (orderbook: IOrderBook, asks: ISymbolItem[], bids: ISymbolItem[]):IOrderBook => {
  const update = (type: keyof IOrderBook, newItems:ISymbolItem[]):void => {
    newItems.forEach((newItem: ISymbolItem) => {        
      const index = newOrderBook[type].findIndex((item: ISymbolItem) => item.price === newItem.price)

      if (index == -1)  {
        if (newItem.quantity == 0) return;
        newOrderBook[type].push(newItem)
        return;
      }

      if (newItem.quantity == 0) {
        newOrderBook[type].splice(index, 1);
        return;
      }

      newOrderBook[type][index] = newItem;
    });

    switch (type) {
      case 'asks': newOrderBook[type].sort((a: ISymbolItem, b: ISymbolItem) => a.price - b.price);
        break;
      case 'bids': newOrderBook[type].sort((a: ISymbolItem, b: ISymbolItem) => b.price - a.price);
        break;  
    }
    
    newOrderBook[type] = newOrderBook[type].slice(0, 100);
  };

  const newOrderBook = orderbook;

  update('asks', asks);
  update('bids', bids);

  return newOrderBook
}