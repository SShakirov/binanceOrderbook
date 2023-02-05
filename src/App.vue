
<template>
  <RouterView/>
  
  <PushNotificationGroup/>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted} from 'vue';
import {RouterView} from 'vue-router';

import {useBinanceModule} from '@/modules/binance/store';
import useMobileHelper from '@/store/mobileModule';

import PushNotificationGroup from '@/modules/pushNotifications/components/PushNotificationGroup.vue';



const mobileModule = useMobileHelper();
const binanceModule = useBinanceModule();


onMounted(async () => {
  mobileModule.setListener();
  console.log(await binanceModule.requestSymbolHistory());
  binanceModule.initBinanceSocket();
});

onBeforeUnmount(() => {
  binanceModule.closeBinanceSocket();
});
</script>

<style lang="scss">
@import "assets/styles/defaults";
</style>
