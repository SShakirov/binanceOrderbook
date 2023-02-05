<template>
  <CheckboxComponent :class="[...getClasses]"/>
</template>

<script lang="ts">
export const componentName = 'CheckboxStyled';
export const componentNameClass = 'checkbox';

export const noClassAttributes = [''];
export const validators = {
  type: ['main'] as string[],
  subtype: [
    'main-first', 'main-black',
    'main-blue', 'main-white',
  ] as string[],
};

export default {};
</script>

<script lang="ts" setup>
import CheckboxComponent from '../components/CheckboxComponent.vue';

import classesFromPropsHook from '@/shared/hooks/classesFromPropsHook';



interface IProps {
  type?: typeof validators.type[number],
  subtype?: typeof validators.subtype[number],
}


const props = defineProps<IProps>();
const {getClasses} = classesFromPropsHook(props,
    componentName, componentNameClass, noClassAttributes, validators);
</script>

<style lang="scss">
@import "../../assets/styles/base";

.checkbox {
  &__type {
    &__main {
      .checkbox__mark {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: solid 1px;
        padding: 4px;

        &:after {
          top: 4px;
          bottom: 4px;
          left: 4px;
          right: 4px;

          background-color: $text-blue;
          border-radius: 50%;
        }
      }
    }
  }

  &__subtype {
    &__main {
      &-first {
        .checkbox__mark {
          border-color: $text-blue;

          &:after {
            background-color: $text-blue;
          }
        }

        .label {
          color: $text-gray-2;
        }
      }

      &-black {
        .checkbox__mark {
          border-color: $black;

          &:after {
            background-color: $black;
          }
        }

        .label {
          color: $black;
        }
      }

      &-blue {
        .checkbox__mark {
          border-color: $text-blue;

          &:after {
            background-color: $text-blue;
          }
        }

        .label {
          color: $text-blue;
        }
      }

      &-white {
        .checkbox__mark {
          border-color: $white;

          &:after {
            background-color: $white;
          }
        }

        .label {
          color: $white;
        }
      }
    }
  }
}
</style>
