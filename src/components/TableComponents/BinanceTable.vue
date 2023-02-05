<template>
  <div :class="['binance-table', ...getClasses]">
    <div class="binance-table-head">
      <LabelStyled class="binance-table-head__header"
                   :text="getHeaderText"
                   color="black"
                   :fontSize="16"
                   :fontWeight="500"
                   :noWrap="true"
                   location="left"/>
      <div class="binance-table-head__columns">
        <template v-for="item in getColumnsNameStruct" :key="item">
          <LabelStyled class="binance-table-head__columns__column-name"
                       :text="item.columnName"
                       color="gray-3"
                       :fontSize="12"
                       :fontWeight="400"
                       :noWrap="true"
                       :location="item.position"/>
        </template>
      </div>
    </div>

    <template v-for="(item, index) in getTableItemList" :key="item">
      <BinanceTableRow :type="props.type"
                       :item="item"
                       :struct="getColumnsNameStruct"
                       :order="index+1"
                       :maxQuantity="getMaxQuantityForCurrentDepth"/>
    </template>
  </div>
</template>

<script lang="ts">
const componentName = 'BinanceTable';
const componentNameClass = 'binance-table';

const noClassAttributes = [
  'symbol', 'orderBook',
  'depth',
]

const validators = {
type: ['asks', 'bids'] as Array<string>
};

export default {};
</script>

<script setup lang="ts">
import { computed } from 'vue';

import { type IOrderBook, type ISymbolItem } from '@/modules/binance/store/types';

import { type IColumnStruct, type ITextParameters } from '@/components/TableComponents/types';

import LabelStyled from '@/UI/components_styled/LabelStyled.vue';
import BinanceTableRow from '@/components/TableComponents/BinanceTableRow.vue';

import classesFromPropsHook from '@/shared/hooks/classesFromPropsHook';


interface IProps {
  orderBook: IOrderBook,
  depth?: number,
  type: keyof IOrderBook,
}

const props = withDefaults(defineProps<IProps>(),{
  depth: 0,
});


const getHeaderText = computed<string>(() => {
  switch (props.type) {
    case 'bids': return 'Buy Order'; 
    case 'asks': return 'Sell Order'; 
    default: return '';
        }
});

const getTableItemList = computed<Array<ISymbolItem>>(() => props.orderBook[props.type].slice(0, props.depth))

const getMaxQuantityForCurrentDepth = computed<number>(() => {
  const quantityArray = getTableItemList.value.map((item) => item.quantity);
  return Math.max(...quantityArray);
})

const getColumnsNameStruct = computed<Array<IColumnStruct>>(() => {
  return [
    {
      columnName: 'Side',
      getTextParameters: (order: number, type: keyof IOrderBook, item: ISymbolItem):ITextParameters => {
        const parameters = {
          text: '',
          color: '',
        } as ITextParameters

        switch (type) {
        case 'bids' : parameters.text = `Buy ${order}`; 
          break;
        case 'asks' : parameters.text = `Sell ${order}`;
          break;
        default: parameters.text = 'loading';
        }

        switch (type) {
        case 'bids' : parameters.color = 'green'; 
          break;
        case 'asks' : parameters.color = 'red';
          break;
        default: parameters.color = 'black';
        }

        return parameters;
      },
    },
    {
      columnName: 'Price (USDT)',
      getTextParameters: (order: number, type: keyof IOrderBook, item: ISymbolItem):ITextParameters => ({
        text: item.price
      })
    },
    {
      columnName: 'Amount (BTC)',
      getTextParameters: (order: number, type: keyof IOrderBook, item: ISymbolItem):ITextParameters => ({
        text: item.quantity
      }),
      toFixedIndex: 5,
    },
    {
      columnName: 'Total (USDT)',
      getTextParameters: (order: number, type: keyof IOrderBook, item: ISymbolItem):ITextParameters => ({
        text: item.total
      }),
      toFixedIndex: 7,
    },
    {
      columnName: 'Sum (USDT)',
      getTextParameters: (order: number, type: keyof IOrderBook, item: ISymbolItem):ITextParameters => {
        const parameters = {
          text: '',
        }as ITextParameters

        parameters.text = getTableItemList.value
        .map((item) => item.total)
        .slice(0, order)
        .reduce((partialSum, a) => partialSum + a, 0);

        return parameters;
      },
      position: 'right',
      toFixedIndex: 7,
    },
  ]
})

const {getClasses} = classesFromPropsHook(props,
    componentName, componentNameClass, noClassAttributes, validators);
</script>

<style lang="scss">
@import "../../assets/styles/defaults";

.binance-table {
  width: 100%;
  border: 1px solid $background-gray-3;
}

.binance-table-head{
  padding-top: 15px;
  
  &__header{
    padding: 0 30px;
  }

  &__columns{
    width: 100%;
    padding: 8px 30px;
    display: flex;
    overflow: hidden;
    border-bottom: 1px solid $background-gray-3;

    &__column-name{
      flex: 1 1;
    }
  }
}
</style>