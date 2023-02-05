import {defineStore} from 'pinia';
import {ref, computed } from 'vue';

import {reformatSymbolInfo} from '@/modules/binance/helpers/format';
import {updateOrderbook} from '@/modules/binance/helpers/update';

import {type IOrderBook, type IDepthUpdateFromStream} from './types';

import {WebSocketWrapper} from '@/shared/api/webSocket';
import {serializeFromObjectToQueryString} from '@/shared/helpers/serialize';
import useRequest from '@/shared/hooks/requestHook';






const requests = useRequest();

const urls = {
  history: 'api.binance.com/api/v3/depth',
  websocket: ' wss://stream.binance.com:9443/ws/{symbol}@depth',
};

export const useBinanceModule = defineStore('binanceModule', () => {
  const currentSettings = ref({
    symbol: 'BTCUSDT',
    limit: '500',
  });

  const currentOrderBook = ref<IOrderBook>({
    asks: [],
    bids: [],
  });

  const socket = new WebSocketWrapper();


  const getCurrentOrderBook = computed<IOrderBook>(() => currentOrderBook.value);

  const requestSymbolHistory = async (): Promise<IOrderBook> => {

    return requests.get(urls.history + '?' + serializeFromObjectToQueryString(currentSettings.value))
        .then((data) => {
          currentOrderBook.value.asks = reformatSymbolInfo(data.asks);
          currentOrderBook.value.bids = reformatSymbolInfo(data.bids);
          return currentOrderBook.value;
        });
  };

  const initBinanceSocket = async (): Promise<WebSocketWrapper> => {
    const onMessage = (message:IDepthUpdateFromStream) => {
      const asks = reformatSymbolInfo(message.a);
      const bids = reformatSymbolInfo(message.b);
      const orderbook = JSON.parse(JSON.stringify(currentOrderBook.value));
      currentOrderBook.value = updateOrderbook(orderbook, asks, bids);
      
    };
    

    const initSocket = () => {
      const url = urls.websocket.replace('{symbol}', currentSettings.value.symbol.toLowerCase());
      socket.init(url, onMessage);
    };

    initSocket();

    return socket;
  };

  const closeBinanceSocket = async (): Promise<void> => {
    socket.close();
  }

  return {
    getCurrentOrderBook,

    requestSymbolHistory,
    initBinanceSocket,
    closeBinanceSocket,
  };
});
