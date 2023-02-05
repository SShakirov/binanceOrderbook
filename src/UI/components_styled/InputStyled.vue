<template>
  <InputComponent :styleClasses="[...getClasses, ...getAdditionalClasses]"
                  :disabled="props.disabled"/>
</template>


<script lang="ts">

export const componentName = 'InputStyled';
export const componentNameClass = 'input';

export const noClassAttributes = ['disabled'];
export const validators = {
  subtype: [
    'main', 'main-error',
    'second',
    'third',
    'chat',
  ] as string[],
  disabled: [true, false] as boolean[],
};

export default {};
</script>


<script setup lang="ts">
import {computed} from 'vue';

import InputComponent from '../components/InputComponent.vue';

import classesFromPropsHook from '@/shared/hooks/classesFromPropsHook';




interface IProps {
  subtype?: typeof validators.subtype[number],
  disabled?: typeof validators.disabled[number],
}


const props = defineProps<IProps>();
const {getClasses} = classesFromPropsHook(props,
    componentName, componentNameClass, noClassAttributes, validators);

const getAdditionalClasses = computed(() => {
  return props.disabled ? `input__subtype__${props.subtype}__disabled`: '';
});

</script>


<style lang="scss">
@import '../../assets/styles/base.scss';

@mixin subtype-main() {
  padding: 10px 30px;

  border: 1px solid $input-gray;
  border-radius: 30px;

  background: $input-gray;

  transition: all .2s;

  @include respond-to('ipad-8.3') {
    padding: 1px 16px;
  }

  &:hover,
  &:focus,
  &:active {
    border: 1px solid $text-gray;
  }

  &.input__with-icon {
    padding-right: 51px;

    @include respond-to('iphone-8') {
      padding-right: 45px;
    }
  }

  & + .input-button {
    position: absolute;
    right: 0;
    height: 100%;
    width: 41px;
    padding-right: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 2;

    @include respond-to('ipad-8.3') {
      padding-right: 16px;
    }

    .icon {
      background: $text-gray;

      &:hover {
        background: $text-gray;
      }
    }

    &.active {
      .icon {
        background: $black;

        &:hover {
          background: $black;
        }
      }
    }
  }
}

.input {
  &__subtype {
    &__main {
      @include subtype-main();
    }

    &__main-error {
      @include subtype-main();
      color: $text-red;
    }

    &__second {
      @include subtype-main();
      padding: 4.5px 15px;

      @include respond-to-sugar(padding, (
        'ipad-8.3': 1px 15px,
      ));
    }

    &__third {
      @include subtype-main();
      padding: 1px 15px;

      @include respond-to-sugar(padding, (
        'iphone-8': 2px 16px,
      ));

      &.input__with-icon {
        padding-right: 30px;
      }
    }

    &__chat {
      @include subtype-main();
      border: 1px solid $input-border;
      background: $input-light-gray;

      @include respond-to('ipad-8.3') {
        padding: 5px 46px 5px 16px;
      }

      @include respond-to('iphone-8') {
        padding: 2px 46px 2px 16px;
      }
    }
  }
}

.text-input {
  padding: 4.5px 15px;

  .label {
    font-size: 16px !important;
  }

  border-radius: 30px;
  background: $background-gray;
}

</style>
