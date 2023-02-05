<template>
  <HrefWrapper :href="props.href">
    <slot/>
  </HrefWrapper>
</template>

<script setup lang="ts">

import HrefWrapper from './HrefWrapper.vue';


interface Props {
  href?: string,
}

const props = defineProps<Props>();


</script>

<style lang="scss">
</style>
