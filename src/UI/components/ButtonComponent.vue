<template>
  <UniversalWrapper :href="props.href"
                    :class="['button', !getText && 'no-text', ...getClasses, getClassByIcon]">

    <IconComponent v-if="getIconUrl"
                   :url="getIconUrl"
                   :size="props.iconSize"
                   :sizeHeight="getIconHeight"
                   :sizeWidth="getIconWidth"
                   :type="props.iconType"/>

    <LabelComponent v-if="getText"
                    :text="getText"
                    :fontFamily="props.fontFamily"
                    :fontSize="props.fontSize ?? 16"
                    :fontWeight="props.fontWeight"
                    :fontLineHeight="props.fontLineHeight ?? 100"
                    :location="props.fontLocation"
                    :textDecoration="props.fontTextDecoration"/>

  </UniversalWrapper>
</template>


<script lang="ts">

export const componentName = 'ButtonComponent';
export const componentNameClass = 'button';

const noClassAttributes = [
  'text', 'href',
  'iconUrl', 'iconSize', 'iconSizeHeight', 'iconSizeWidth',
  'fontFamily', 'fontSize', 'fontWeight', 'fontLineHeight', 'fontLetterSpacing',
  'fontLocation', 'fontTextDecoration',
  'iconType',
];

export const validators = {
  iconPosition: ['left', 'right', 'top', 'bottom'] as Array<string>,
  type: [''] as Array<string>,
  aspectRatio: ['equal'] as Array<string>,
  disabled: [false, true] as Array<boolean>,
};

export default {};
</script>


<script setup lang="ts">
import {computed} from 'vue';

import classesFromPropsHook from '@/shared/hooks/classesFromPropsHook';


import UniversalWrapper from '../UniversalWrapper.vue';
import IconComponent from './IconComponent.vue';
import LabelComponent from './LabelComponent.vue';



interface IProps {
  text?: string,
  href?: string,

  // font parameters
  fontFamily?: string,
  fontSize?: number,
  fontWeight?: number,
  fontLineHeight?: number,
  fontLetterSpacing?: number,
  fontLocation?: string,
  fontTextDecoration?: string,

  // icon parameters
  iconUrl?: string,
  iconType?: string,
  iconPosition?: typeof validators.iconPosition[number],
  iconSize?: number,
  iconSizeHeight?: number,
  iconSizeWidth?: number,

  // style parameters
  type?: typeof validators.type[number],
  aspectRatio?: typeof validators.aspectRatio[number],
  disabled?: boolean,
}

const props = withDefaults(defineProps<IProps>(), {
  fontLocation: 'center',
  iconType: 'svg',
});


const {getClasses} = classesFromPropsHook(props,
    componentName, componentNameClass, noClassAttributes, validators);

const getText = computed(() => props.text ? props.text : '');

const getIconWidth = computed(() => {
  switch (props.type) {
    default: return props.iconSizeWidth;
  }
});

const getIconHeight = computed(() => {
  switch (props.type) {
    default: return props.iconSizeHeight;
  }
});

const getIconUrl = computed(() => {
  switch (props.type) {
    default: return props.iconUrl ?? '';
  }
});

const getClassByIcon = computed(() => {
  switch (props.iconUrl) {
    case '/img/icons/button/arrow-back-icon.svg': return 'button__image__back';
    default: return undefined;
  }
});

</script>

<style lang="scss">
@import '../../assets/styles/base';

.button {
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  width: max-content;
  padding: 6px 40px;

  border: 1px solid black;
  border-radius: 5px;

  cursor: pointer;
  transition: all 0.2s;

  background: transparent;

  .label {
    color: black;
  }

  .icon {
    background: black;
    margin: 0 10px 0 0;
  }

  &:hover {
    border: 1px solid gray;
    background: gray;

    .label {
      color: white;
    }

    .icon {
      background: white;
    }
  }

  &__icon-position {
    &__right {
      flex-direction: row-reverse;

      .icon {
        margin: 0 0 0 10px;
      }
    }

    &__top {
      flex-direction: column;

      .icon {
        margin: 0 0 10px 0;
      }
    }

    &__bottom {
      flex-direction: column-reverse;

      .icon {
        margin: 10px 0 0 0;
      }
    }
  }

  &.no-text {
    .icon {
      margin: 0;
    }
  }

  &__disabled {
    cursor: default;
    pointer-events: none;
  }
}
</style>
