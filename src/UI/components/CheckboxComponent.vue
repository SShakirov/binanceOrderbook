<template>
  <label :class="['checkbox__wrapper', ...getClasses]">
    <input class="checkbox"
           v-model="value"
           :disabled="props.disabled"
           type="checkbox">

    <span class="checkbox__mark"/>

    <LabelComponent v-if="getText" class="checkbox__label"
                    :text="getText"
                    :fontFamily="props.fontFamily"
                    :fontSize="props.fontSize ?? 16"
                    :fontWeight="props.fontWeight"
                    :fontLineHeight="props.fontLineHeight"
                    :location="props.fontLocation"
                    :textDecoration="props.fontTextDecoration"/>
  </label>
</template>


<script lang="ts">
export const validators = {
  checkboxPosition: ['left', 'right', 'top', 'bottom'] as Array<string>,
};

export default {};
</script>


<script lang="ts" setup>
import {computed, ref, watch} from 'vue';

import LabelComponent from './LabelComponent.vue';

interface IProps {
  text?: string,
  modelValue?: boolean,
  checkboxPosition?: typeof validators.checkboxPosition[number],

  disabled?: boolean,

  // font parameters
  fontFamily?: string,
  fontSize?: number,
  fontWeight?: number,
  fontLineHeight?: number,
  fontLetterSpacing?: number,
  fontLocation?: string,
  fontTextDecoration?: string,
}


const emit = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<IProps>(), {
  modelValue: false,
  checkboxPosition: 'left',
});


const value = ref<boolean>(props.modelValue);


const getText = computed(() => props.text ? props.text : '');

const getClasses = computed(() => [
  `checkbox__position__${props.checkboxPosition}`,
  props.disabled && 'checkbox__disabled',
]);


watch(() => props.modelValue, () => {value.value = props.modelValue});
watch(value, (value) => emit('update:modelValue', value));
</script>

<style lang="scss">
@import "../../assets/styles/base";

.checkbox {
  position: absolute;

  opacity: 0;
  appearance: none;

  &__wrapper {
    display: grid;
    width: max-content;

    grid-auto-columns: max-content;
    grid-auto-rows: max-content;
    align-items: center;
    justify-items: center;

    grid-gap: 10px;

    cursor: pointer;

    & .checkbox:checked ~ .checkbox__mark:after {
      opacity: 1;
    }
  }

  &__mark {
    position: relative;

    &:after {
      content: '';

      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;

      opacity: 0;

      transition: opacity 0.2s;
    }
  }

  &__position {
    &__top {
      grid-auto-flow: row;
    }

    &__left {
      grid-auto-flow: column;

    }

    &__right {
      grid-auto-flow: column;

      & > *:last-child {
        order: -1;
      }
    }

    &__bottom {
      grid-auto-flow: row;

      & > *:last-child {
        order: -1;
      }
    }
  }

  &__disabled {
    cursor: default;
  }
}
</style>
