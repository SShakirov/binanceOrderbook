<template>
  <CheckComponent :class="getClasses"/>
</template>


<script lang="ts">
export const componentName = 'CheckStyled';
export const componentNameClass = 'check-component';

export const noClassAttributes = [''];
export const validators = {
  type: ['main'] as string[],
  subtype: [
    'main-white',
  ] as string[],
};

export default {};
</script>


<script lang="ts" setup>
import CheckComponent from '../components/CheckComponent.vue';

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

.check-component {
  &__type {
    &__main {
      .check-component {
        &__choice {
          background: $background-light-gray-2;
          padding: 3px;
          border-radius: 24px;

          &__wrapper {
            padding: 3px 30px;

            display: flex;
            justify-content: center;
            align-content: center;

            border-radius: 24px;
            background: transparent;

            transition: padding 0.2s;

            @include respond-to-sugar(padding, (
              'ipad-12.9': 3px 30px,
              'ipad-8.3': 0.5px 20px,
            ));

            .label {
              color: $text-gray;
            }

            &-active {
              background: $white;

              .label {
                color: $black;
              }
            }
          }
        }
      }
    }
  }
}
</style>
