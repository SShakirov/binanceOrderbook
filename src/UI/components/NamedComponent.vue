<template>
  <label :class="getClasses">
    <LabelWithAccent class="named-field__text-hint"
                     :text="props.text"
                     :fontFamily="props.fontFamily"
                     :fontSize="props.fontSize"
                     :fontWeight="props.fontWeight"
                     :fontLineHeight="props.fontLineHeight"
                     :color="props.color"
                     :fontFamilyAccent="props.fontFamilyAccent"
                     :fontSizeAccent="props.fontSizeAccent"
                     :fontWeightAccent="props.fontWeightAccent"
                     :fontLineHeightAccent="props.fontLineHeightAccent"
                     :colorAccent="props.colorAccent"
                     :location="props.location"/>
    <slot/>
  </label>
</template>


<script lang="ts">
export const validators = {
  location: ['left', 'center', 'right'],
};

export default {};
</script>


<script setup lang="ts">
import {computed} from 'vue';

import LabelWithAccent from '../components_styled/LabelWithAccent.vue';


interface Props {
  text: string,

  // font parameters
  fontFamily?: string,
  fontSize?: number,
  fontWeight?: number,
  fontLineHeight?: number,
  fontLetterSpacing?: number,

  // font parameters accent
  fontFamilyAccent?: string,
  fontSizeAccent?: number,
  fontWeightAccent?: number,
  fontLineHeightAccent?: number,
  fontLetterSpacingAccent?: number,

  // text parameters
  color?: string,
  colorAccent?: string,
  location?: typeof validators.location[number],
}

const props = withDefaults(defineProps<Props>(), {
  location: validators.location[0],
});


const getClasses = computed(() => {
  return [
    `named-field`,
  ];
});

</script>


<style lang="scss">
@import "../../assets/styles/base";

.named-field {
  position: relative;

  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: max-content;
  grid-gap: 5px;

  transition: grid-gap 0.2s;

  @include respond-to-sugar(grid-gap, (
      'iphone-8': 6px,
  ));

  .label {
    z-index: 2;
  }
}

</style>
