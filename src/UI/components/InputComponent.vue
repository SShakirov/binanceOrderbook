<template>
  <div class="input__wrapper">
    <div class="input__container">
      <div class="input__prefix">
        <LabelStyled v-if="props.prefix"
                     :text="props.prefix"
                     fontSize="16"/>
      </div>

      <textarea v-if="getType === 'textarea'"
                v-model="value"
                ref="input"
                :placeholder="getPlaceholder"
                :readonly="props.readonly"
                :maxlength="props.maxlength"
                :class="[...getClasses, ...getAdditionalClasses, ...props.styleClasses]"
                @keyup.enter="keyUpEnter"/>

      <input v-else
             :type="getType"
             v-model="value"
             ref="input"
             :readonly="props.readonly"
             :inputmode="getInputMode"
             :autocomplete="getAutoComplete"
             :step="props.step"
             :placeholder="getPlaceholder"
             :class="[...getClasses, ...getAdditionalClasses, ...props.styleClasses]"
             @input="validateValue"
             @change="validateValue"
             @keydown="keyPress"
             @keyup.enter="keyUpEnter"/>

      <ButtonStyled v-if="getIconUrl" class="input-button"
                    :class="{'active': isActiveIcon}"
                    :iconUrl="getIconUrl"
                    :iconSize="24"
                    type="label"
                    @click="changeIsActiveIcon"/>

      <div v-if="getIsShowCounter"
           class="input-counter">
        <ButtonStyled :disabled="getIsMaxCounterDisabled"
                      iconUrl="/icons/upbtn.svg"
                      iconType="png"
                      type="label"
                      subtype="label-icon"
                      @click="increase"/>

        <ButtonStyled :disabled="getIsMinCounterDisabled"
                      iconUrl="/icons/upbtn.svg"
                      iconType="png"
                      type="label"
                      subtype="label-icon"
                      @click="increase(false)"/>
      </div>
    </div>
    <ButtonStyled v-if="props.withCopy" class="input-button__copy"
                  iconType="svg"
                  iconUrl="/icons/copy.svg"
                  :iconSize="24"
                  type="icon"
                  @click="copy"/>
  </div>
</template>

<script lang="ts">

const validators = {
  type: ['text', 'textarea', 'password', 'email', 'number', 'search', 'number-only'] as Array<string>,
};
export default {};
</script>

<script setup lang="ts">
import {computed, ref, watch} from 'vue';

import usePushNotificationModule from '@/modules/pushNotifications/store';

import ButtonStyled from '../components_styled/ButtonStyled.vue';
import LabelStyled from '../components_styled/LabelStyled.vue';




interface Props {
  placeholder?: string,
  modelValue?: string | number,
  type?: typeof validators.type[number],
  prefix?: string,

  disabled?: boolean,
  maxlength?: number,
  minNumber?: number,
  maxNumber?: number,
  step?: number,

  autocomplete?: boolean,
  withCopy?: boolean,
  readonly?: boolean,

  styleClasses?: string[],

  withCounter?: boolean,
}

const emit = defineEmits(['update:modelValue', 'keyUpEnter']);
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: validators.type[0],
  subtype: validators.subtype[0],
  minNumber: 0,
  maxNumber: 1e9,
  autocomplete: false,
  withCounter: true,
});
const typesForAutocomplete = ['password', 'email', 'text'];

const pushNotificationModule = usePushNotificationModule();
// validators to props
if (import.meta.env.MODE === 'development') {
  if (!validators.type.includes(props.type)) {
    console.warn(`InputComponent haven't define to ${props.type} type`);
  }
}

const input = ref<HTMLInputElement | null>(null);


const value = ref<string | number>(props.modelValue);
const isActiveIcon = ref(false);


const getType = computed(() => {
  if (props.type === 'password' && isActiveIcon.value) return 'input';
  if (props.type === 'number-only') return 'text';
  return props.type ? props.type : '';
});
const getIconUrl = computed(() => {
  switch (props.type) {
    case 'password':
      return '/icons/eye.svg';
    case 'search':
      return '/icons/search.svg';
    default:
      return undefined;
  }
});
const getPlaceholder = computed(() => props.placeholder ? props.placeholder : undefined);
const getSubtype = computed(() => props.subtype ? props.subtype : null);
const getClasses = computed(() => [
  `input`,
  `input__type__${getType.value}`,
  `input__subtype__${getSubtype.value}`,
  (props.disabled) ? `input__disabled` : undefined,
]);

const getAdditionalClasses = computed(() => [
  (getIconUrl.value != null || (props.type === 'number' || props.type === 'number-only')) && 'input__with-icon',
  'label',
]);

const getInputMode = computed(() => {
  switch (props.type) {
    case 'number':
      return 'numeric';
    case 'search':
      return 'search';
    case 'email':
      return 'email';
    case 'number-only':
      return 'tel';
    default:
      return '';
  }
});

const getAutoComplete = computed(() => {
  let autocomplete = props.autocomplete;
  if (!autocomplete) {
    autocomplete = typesForAutocomplete.some((item) => item === getType.value);
  }
  return autocomplete ? 'on' : 'off';
});

const getIsShowCounter = computed(() => {
  return props.withCounter && !props.disabled && (props.type === 'number' || props.type === 'number-only');
});

const getIsMaxCounterDisabled = computed(() => +value.value === +props.maxNumber);
const getIsMinCounterDisabled = computed(() => +value.value === +props.minNumber);


const changeIsActiveIcon = (): void => {
  isActiveIcon.value = !isActiveIcon.value;
};

const validateValue = () => {
  if (props.type === 'number-only') {
    value.value = value.value.toString().replace(/[^\d]/g, '');
  }

  if (getType.value == 'number' || props.type === 'number-only') {
    if ((props.minNumber || props.minNumber === 0) && +value.value < Number(props.minNumber)) {
      value.value = props.minNumber;
    }
    if (props.maxNumber && +value.value > Number(props.maxNumber)) {
      value.value = props.maxNumber;
    }
  }
};

const increase = (flag = true) => {
  const sign = flag ? (props.step ?? 1) : -(props.step ?? 1);
  const result = +value.value + sign;
  if (result < +props.minNumber || result > +props.maxNumber) return;
  value.value = +result.toFixed(2);
};

const keyUpEnter = (): void => emit('keyUpEnter');

const copy = () => {
  if (!input.value) return;

  navigator.clipboard.writeText(input.value.value)
      .then(() => {
        pushNotificationModule.sendSuccessNotification('Copying to clipboard was successful!');
      })
      .catch((error) => {
        const message = 'Could not copy text: ' + error.toString();
        pushNotificationModule.sendErrorNotification(message);
      });
};

const keyPress = (evt: KeyboardEvent) => {
  if (props.type === 'number-only' || props.type === 'number') {
    switch (evt.key) {
      case 'ArrowUp':
        increase();
        evt.preventDefault();
        break;
      case 'ArrowDown':
        increase(false);
        evt.preventDefault();
        break;
    }
  }
};


watch(() => props.modelValue, () => {value.value = props.modelValue});
watch(value, (value) => emit('update:modelValue', value));

</script>

<style lang="scss">
@import '../../assets/styles/base';

.input {
  width: 100%;
  transition: all .2s;
  font-size: 16px;

  &__wrapper {
    width: 100%;

    display: grid;
    grid-auto-columns: 1fr max-content;
    grid-auto-flow: column;
    grid-gap: 10px;

    .input-counter {
      position: absolute;
      display: grid;
      grid-auto-flow: row;
      grid-auto-rows: max-content;
      align-content: center;
      gap: 2px;
      right: 15px;
      top: 0;
      height: 100%;
      z-index: 2;

      &__disabled {
        opacity: 0.5;
      }

      @include respond-to('ipad-8.3') {
        right: 10px;
      }

      @include respond-to('iphone-8') {
        gap: 1px;
      }

      .button {
        &:nth-last-child(1) {
          transform: rotate(180deg);
        }
      }

      .icon {
        width: 12px;
        height: 12px;
      }
    }
  }

  &__container {
    width: 100%;
    position: relative;

    display: grid;
    grid-auto-flow: column;
    grid-gap: 10px;
  }

  &__prefix {
    position: absolute;
    height: 100%;
    width: 28px;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    z-index: 20;

    @include respond-to('ipad-8.3') {
      width: 14px;
    }
  }

  &-button {
    width: max-content;

    &.active {
      .icon {
        border: none;
        background: #fff;
      }
    }

    &__copy {
      .icon {
        background: #fff;
      }
    }
  }

  &__disabled {
    cursor: default;
    pointer-events: none;
  }

  &__with-icon {
    padding-right: 48px;
  }

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type=number] {
    -moz-appearance: textfield;
  }
}

</style>
