<template>
  <div :class="['binance-table-row', ...getClasses]">

      <div class="table-progress-bar"
           :style='getProgressBarStyles'/>
      <template v-for="item in props.struct" :key="item">
        <LabelStyled class="binance-table-row__cell"
                     :text="item.getTextParameters(props.order, props.type, props.item).text"
                     :color="item.getTextParameters(props.order, props.type, props.item).color"
                     :fontSize="12"
                     :fontWeight="item.getTextParameters(props.order, props.type, props.item).weight"
                     :location="item.position"
                     :toFixedIndex="item.toFixedIndex"
                     :noWrap="true"/>
      </template> 
  </div>
</template>

<script lang="ts">
const componentName = 'BinanceTableRow';
const componentNameClass = 'binance-table-row';

const noClassAttributes = [
  'item', 'order',
  'maxQuantity', 'struct'
]

const validators = {
type: ['asks', 'bids'] as Array<string>
};

export default {};
</script>

<script setup lang="ts">
import { computed } from 'vue';

import { type IOrderBook, type ISymbolItem } from '@/modules/binance/store/types';

import { type IColumnStruct } from '@/components/TableComponents/types';

import LabelStyled from '@/UI/components_styled/LabelStyled.vue';

import classesFromPropsHook from '@/shared/hooks/classesFromPropsHook';



interface IProps {
  type: keyof IOrderBook,
  item: ISymbolItem,
  order: number,
  struct: Array<IColumnStruct>,
  maxQuantity: number,
}

const props = defineProps<IProps>();

const getProgressBarStyles = computed<string>(() => {
  const ratio = props.item.quantity / props.maxQuantity * 100;

  return `width: ${ratio}%`;
});


const {getClasses} = classesFromPropsHook(props,
    componentName, componentNameClass, noClassAttributes, validators);
</script>

<style lang="scss">
@import "../../assets/styles/defaults";

.binance-table-row {
  width: 100%;
  padding: 8px 30px;
  margin: 1px 0;
  display: flex;
  overflow: hidden;
  position: relative;
  transition: 0,2s;
  background: $white;
  cursor: pointer;

  &:hover{
    background: $background-light-gray;
  }

  &__cell{
    flex: 1 1;
  }

  &__type{
    
    &__asks{
      .table-progress-bar{
        background: $background-red;
      }
    }
    &__bids{
      .table-progress-bar{
        background: $background-green;
      }
    }
  }
}

.table-progress-bar{
  width: 0;
  right: 0;
  top: 0px;
  bottom: 0px;
  opacity: 0.15;
  position: absolute;
}
</style>