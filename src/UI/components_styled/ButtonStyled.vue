<template>
  <ButtonComponent :class="[...getClasses, ...getAdditionalClasses]"
                   :disabled="props.disabled"/>
</template>


<script lang="ts">

export const componentName = 'ButtonStyled';
export const componentNameClass = 'button';

export const noClassAttributes = ['disabled'];
export const validators = {
  type: ['main', 'label'] as string[],
  subtype: [
    'main-first', 'main-first-blur', 'main-second', 'main-decline',
    'main-blue',
    'main-green', 'main-green-line',
    'label-green', 'label-black', 'label-blue',
    'label-white', 'label-gray', 'icon',
    'label-icon', 'main-green-blur',
  ] as string[],
  disabled: [true, false] as boolean[],
};

export default {};
</script>


<script setup lang="ts">
import {computed} from 'vue';

import ButtonComponent from '../components/ButtonComponent.vue';

import classesFromPropsHook from '@/shared/hooks/classesFromPropsHook';




interface IProps {
  type?: typeof validators.type[number],
  subtype?: typeof validators.subtype[number],
  disabled?: boolean,
}


const props = defineProps<IProps>();
const {getClasses} = classesFromPropsHook(props,
    componentName, componentNameClass, noClassAttributes, validators);

const getAdditionalClasses = computed(() => [
  props.disabled && `button__subtype__${props.subtype}__disabled`,
]);

</script>

<style lang="scss">
@import '../../assets/styles/base.scss';

.button {
  &__type {
    &__main {
      padding: 12px 70px;
      border-radius: 54px;

      @include respond-to-sugar(padding, (
        'ipad-8.3': 10.5px 45.5px,
        '500': 10px 42px,
        'iphone-8': 10px 40px,
      ));

      &:hover, &_hover {
        transform: scale(1.04);
      }

      &:active {
        transform: scale(1);
      }
    }

    &__label {
      width: max-content;
      padding: 0;

      justify-content: inherit;

      border: none;
      border-radius: 0;

      .icon {
        background: none;
      }

      &:hover {
        border: none;
        background: none;

        transform: scale(1.04);
        .icon {
          background: none;
        }
      }

      &:active {
        transform: scale(1);
      }
    }

    &__icon{
      width: max-content;
      padding: 0;

      justify-content: inherit;

      border: none;
      border-radius: 0;

      &:hover {
        border: unset;
        background: unset;
        transform: scale(1.04);
      }

      &:active {
        transform: scale(1);
      }
    }
  }

  &__subtype {
    &__main {
      &-first {
        border: 1px solid $white;

        .label {
          color: $white;
        }

        &:hover {
          background: $white;
          border: 1px solid $white;

          .label {
            color: $text-blue;
          }
        }
      }

      &-first-blur {
        background: rgba(0, 25, 77, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid $white;

        .label {
          color: $white;
        }

        &:hover, &_hover {
          background: $white;
          border: 1px solid $white;

          .label {
            color: $text-blue;
          }
        }
      }

      &-green-line {
        border: 1px solid $text-green;

        .label {
          color: $text-green;
        }

        &:hover {
          background: $text-green-2;
          border: 1px solid $text-green-2;

          .label {
            color: $white;
          }
        }

        &__disabled {
          border: 1px solid $button-gray;
          background: $button-gray;
        }
      }

      &-second {
        border: 1px solid $background-blue;
        background: $background-blue;

        .label {
          color: $white;
        }

        &:hover {
          background: $background-blue;

          .label {
            color: $white;
          }
        }

        &__disabled {
          border: 1px solid $button-gray;
          background: $button-gray;
        }
      }

      &-decline {
        border: 1px solid $text-red;
        background: $text-red;

        .label {
          color: $white;
        }

        &:hover {
          background: $text-red;

          .label {
            color: $white;
          }
        }

        &__disabled {
          border: 1px solid $button-gray;
          background: $button-gray;
        }
      }

      &-blue {
        border: 1px solid $background-blue;

        .label {
          color: $text-blue;
        }

        &:hover {
          background: $background-blue;
          border: 1px solid $background-blue;

          .label {
            color: $white;
          }
        }
      }

      &-green {
        border: 1px solid $background-green;
        background: $background-green;

        .label {
          color: $white;
        }

        &:hover {
          background: $background-green;

          .label {
            color: $white;
          }
        }

        &__disabled {
          border: 1px solid $button-gray;
          background: $button-gray;
        }

        .label {
          color: $white;
        }
      }

      &-green-blur {
        background: rgba(79, 255, 117, 0.1);
        border: 1px solid $white;
        backdrop-filter: blur(10px);

        .label {
          color: $text-green;
        }

        &:hover, &_hover {
          background: $text-green-2;
          border: 1px solid $text-green-2;

          .label {
            color: $white;
          }
        }
      }
    }

    &__label {
      &-green {
        .label {
          color: $text-green;
        }

        &:hover {
          .label {
            color: $text-green;
          }
        }
      }

      &-black {
        .label {
          color: $black
        }

        .icon {
          background: $black;
        }

        &:hover {
          .label {
            color: $black;
          }

          .icon {
            background: $black;
          }
        }
      }

      &-blue {
        .label {
          color: $text-blue;
        }

        &:hover {
          .label {
            color: $text-blue;
          }
        }

        &__disabled{
          .label {
            color: $text-gray;
          }
        }
      }

      &-white {
        .label {
          color: $white;
        }

        .icon {
          background: $white;
        }

        &:hover {
          .label {
            color: $white;
          }

          .icon {
            background: $white;
          }
        }
      }

      &-gray {
        .label {
          color: $text-gray;
        }

        .icon {
          background: $text-gray;
        }

        &:hover {
          .label {
            color: $text-gray;
          }

          .icon {
            background: $text-gray;
          }
        }
      }

      &-icon {
        &__disabled{
          .icon {
            opacity: 0.5;
          }
        }
      }
    }
  }
}

</style>
