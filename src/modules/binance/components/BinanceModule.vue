<template>
  <div class="binance-module">
    <div class="binance-module__table-info">
      <LabelWithAccent class="binance-module__table-info__header"
                       text="Order Book - **BTC/USDT**"
                       color="black"
                       colorAccent="gray-3"
                       :fontWeight="500"
                       :fontSize="36"
                       :fontSizeAccent="18"/>

      <NamedComponent class="binance-module__table-info__select"
                      text="Depth"
                      color="gray"
                      :fontWeight="400"
                      :fontSize="12">
        <SelectComponent v-model="selectedDepthItem"
                         :optionsList='getDepthSelectOptions'
                         isAutoSelectFirst
                         type='default'/>
      </NamedComponent>
    </div>

    <div class="binance-module__table-wrapper">
      <BinanceTable :orderBook="getOrderBook"
                    :depth="getSelectedDepth"
                    type="asks"/>

      <BinanceTable :orderBook="getOrderBook"
                    :depth="getSelectedDepth"
                    type="bids"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';

import {useBinanceModule} from '@/modules/binance/store';

import NamedComponent from '@/UI/components/NamedComponent.vue';
import SelectComponent, { type ISelectOptionItem } from '@/UI/components/SelectComponent.vue';
import LabelWithAccent from '@/UI/components_styled/LabelWithAccent.vue';
import BinanceTable from '@/components/TableComponents/BinanceTable.vue';


const binanceModule = useBinanceModule();


const selectedDepthItem = ref<Array<ISelectOptionItem<number>> | undefined>(undefined);


const getOrderBook = computed(() => binanceModule.getCurrentOrderBook);

const getDepthSelectOptions = computed<ISelectOptionItem<number>[]>(() => [
  {
    id: '0',
    text: '15',
    data: 15,
  },
  {
    id: '1',
    text: '30',
    data: 30,
  },
  {
    id: '2',
    text: '50',
    data: 50,
  },
]);

const getSelectedDepth = computed<number>(() => (selectedDepthItem.value?.length) ? selectedDepthItem.value[0].data: 0);

</script>

<style lang="scss">
@import "../../../assets/styles/defaults";

.binance-module{
  padding: 10vh 0;
  min-height: 100vh;
  width: 100%;
  display: grid;
  grid-auto-rows: max-content;
  align-content: center;
  justify-content: center;
  gap: 40px;

  &__table-info{
    &__header{
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__select{
      width: 120px;
    }
  }
  
  &__table-wrapper {
    display: grid;
    gap: 40px;
    grid-auto-flow: column;
    grid-template-columns: 610px 610px;
    grid-template-rows: 1fr;
    justify-content: center;
  }
}
</style>