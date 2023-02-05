<template>
  <div :class="[isOpen && 'select__is-open', ...getClasses]" 
       ref="select" 
       @blur="setIsOpen(false)" 
       tabindex="0">
    <div class="select__selected-items" @click="setIsOpen(!isOpen)">
      <div class="select__selected-items__wrapper">
        <div class="select__options__icon"
             :class="[selectedOptions[0] && selectedOptions[0].imageUrl ? '' : 'empty-icon']">
          <IconComponent v-if="selectedOptions[0] && selectedOptions[0].imageUrl"
                         :url="selectedOptions[0].imageUrl"
                         type="png"
                         :subtype="selectedOptions[0].imageUrl ?? ''"
                         :size="props.iconSize"/>
        </div>

        <LabelStyled v-if="getIsLoading" 
                     class="loading" 
                     text="Loading..." 
                     color="gray" 
                     :fontSize="20"/>

        <LabelStyled v-else-if="!selectedOptions[0]" 
                     :text="props.placeholder" 
                     color="gray" 
                     :fontSize="20"/>

        <LabelStyled v-else-if="selectedOptions[0].text" 
                     :text="selectedOptions[0].text" 
                     :fontSize="20"/>
      </div>

      <div class="select__selected-items__right">
        <LabelStyled v-if="selectedOptions.length > 1"
                     :text="`+ ${selectedOptions.length - 1}`"
                     color="blue"
                     :fontSize="20"/>

        <div v-if="optionsList.length > 0" 
             class="select__selected-items__icon" />
      </div>
    </div>

    <div class="select__options">
      <div v-for="option of optionsList" :key="option" 
           class="select__options__option" 
           @click="selectOption(option)">
        <div class="select__options__icon" 
             :class="[option && option.imageUrl ? '' : 'empty-icon']">
          <IconComponent v-if="option.imageUrl"
                         :url="option.imageUrl"
                         type="png"
                         :subtype="option.imageUrl ?? ''"
                         :size="props.iconSize"/>
        </div>

        <LabelStyled v-if="option.text"
                     :text="option.text"
                     :color="isSelected(option) ? 'black' : 'gray'"
                     :fontSize="20"/>
      </div>
    </div>

    <div class="select__options select__options__height-calc-example">
      <div v-if="optionsList[0]" 
           class="select__options__option" 
           ref="listItem">
        <div class="select__options__icon" :class="[optionsList[0] && optionsList[0].imageUrl ? '' : 'empty-icon']">
          <IconComponent v-if="optionsList[0].imageUrl"
                         :url="optionsList[0].imageUrl"
                         type="png"
                         :subtype="optionsList[0].imageUrl ?? ''"
                         :size="props.iconSize"/>
        </div>

        <LabelStyled v-if="optionsList[0].text"
                     :text="optionsList[0].text"
                     :color="isSelected(optionsList[0]) ? 'black' : 'gray'"
                     :fontSize="20"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export const validators = {
  type: ["main", "default"],
};
export default {};
</script>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";

import IconComponent from "@/UI/components/IconComponent.vue";
import LabelStyled from "@/UI/components_styled/LabelStyled.vue";

export interface ISelectOptionItem<T> {
  id: string;
  text?: string;
  data: T;
  imageUrl?: string;
}

interface IProps {
  placeholder?: string;
  optionsList: Array<ISelectOptionItem<unknown>>;
  modelValue?: Array<ISelectOptionItem<unknown>>;
  isAutoSelectFirst?: boolean;
  type?: typeof validators.type[number];
  isMultiselect?: boolean;
  iconSize?: number;
}

const emits = defineEmits(["update:modelValue"]);

const props = withDefaults(defineProps<IProps>(), {
  placeholder: "Choose Item",
  modelValue: () => [],
  type: "default",
  isMultiselect: false,
  iconSize: 24,
});

const isOpen = ref(false);

const selectedOptions = ref<Array<ISelectOptionItem<unknown>>>([]);

const select = ref<HTMLElement | null>(null);

const listItem = ref<HTMLElement | null>(null);

const optionsList = computed<Array<ISelectOptionItem<unknown>>>(() => {
  const selected = selectedOptions.value[0] ?? { id: "" };
  return props.isAutoSelectFirst ? listWithoutCurrent(selected.id) : props.optionsList;
});

const getIsLoading = computed(() => !props.optionsList?.length);

const getClasses = computed(() => {
  return [`select`, `select__type__${props.type}`, !optionsList.value.length && `select__cursor__default`];
});

const setIsOpen = (value: boolean) => {
  if (!optionsList.value.length) return;
  isOpen.value = value;
};

const selectOption = (option: ISelectOptionItem<unknown>) => {
  if (isSelected(option)) {
    selectedOptions.value = selectedOptions.value.filter(item => item.id !== option.id);
  } else {
    if (props.isMultiselect) {
      selectedOptions.value.push(option);
    } else {
      selectedOptions.value = [option];
      setIsOpen(false);
    }
  }
};

const isSelected = (option: ISelectOptionItem<unknown>) => {
  return selectedOptions.value.find(item => item.id === option.id);
};

const listWithoutCurrent = (id: string) => {
  return props.optionsList.filter(item => item.id !== id);
};

const countElementData = () => {
  setTimeout(() => {
    if (!listItem.value || !select.value) return;
    select.value.style.setProperty("--elements-count", `${optionsList.value.length}`);
    select.value.style.setProperty("--element-height", `${listItem.value.clientHeight}px`);
  }, 100);
};

watch(selectedOptions, () => {
  emits("update:modelValue", selectedOptions.value)
}, { deep: true });

watch(
  props,
  () => {
    const { modelValue } = props;
    if (selectedOptions.value != modelValue) selectedOptions.value = modelValue;
  },
  { deep: true }
);

onMounted(() => {
  if (props.isAutoSelectFirst && props.optionsList.length > 0) {
    selectOption(props.optionsList[0]);
  }
  countElementData();
});

watch(optionsList, () => {
  countElementData();
});
</script>

<style lang="scss">
@import "../../assets/styles/base";

.select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;

  --elements-count: 0;
  --element-height: 0;

  &__cursor__default {
    * {
      cursor: default;
    }
  }

  &__is-open {
    .select__selected-items {
      &__icon {
        transform: rotate(180deg);
      }
    }

    .select__options {
      max-height: min(180px, calc(var(--element-height) * var(--elements-count)));
    }
  }

  &__type {
    &__default {
      .select__selected-items {
        border-radius: 5px;
        border: 1px solid $background-gray-3;
      }

      &.select__is-open {
        .select__options {
          border-radius: 5px;
          border: 1px solid $background-gray-3;

          &__option{
            background: $white;
            
            &:hover{
            background: $background-gray-3;
            }
          }
        }
      }
    }
  }

  &__selected-items {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;
    gap: 7px;

    padding: 0;
    border: 0 solid transparent;

    position: relative;

    z-index: 1;

    &__wrapper {
      display: grid;
      grid-auto-flow: column;
      grid-gap: 5px;
      align-items: center;
    }

    &__right {
      display: grid;
      grid-auto-flow: column;
      grid-template-rows: max-content;
      gap: 5px;
    }

    &__icon {
      width: 26px;
      height: 26px;
      background-image: url("/img/icons/arrow.svg");
      background-repeat: no-repeat;
      background-size: contain;
      transition: all 0.3s linear;
    }

    .loading {
      display: inline-block;
      clip-path: inset(0 1.5ch 0 0);
      animation: loading-animation 1.2s steps(4) infinite;

      @keyframes loading-animation {
        to {
          clip-path: inset(0 -0.5ch 0 0);
        }
      }
    }
  }

  &__options {
    display: inherit;

    position: absolute;
    left: 0;
    right: 0;
    top: calc(100% + 8px);

    width: 100%;

    max-height: 0;
    z-index: 2;

    overflow-y: scroll;
    background: none;
    border: none;

    -webkit-transition: all 0s ease;
    -moz-transition: all 0s ease;
    transition: all 0s ease, border 0s;

    &::-webkit-scrollbar {
      display: none;
    }

    &__icon {
      &.empty-icon {
        // width: 16px;
        // height: 16px;
        // border-radius: 100%;
        // background-color: $background-yellow;
      }
    }

    &__option {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: max-content;
      align-items: center;
      gap: 7px;

      padding: 8px 0;

      cursor: pointer;
      transition: all 0s ease;

      z-index: 2;
      position: relative;

      &:hover {
        .label {
        }
      }
    }
  }

  &__options__height-calc-example {
    position: absolute !important;
    top: -10000px !important;
    left: -10000px !important;
  }
}
</style>
