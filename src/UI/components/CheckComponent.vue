<template>
  <div class="check-component"
       :class="{'check-component__with-border': props.isWithBorder}">

    <div class="check-component__choice">
      <template v-for="el in props.items" :key="el">
        <div class="check-component__choice__wrapper"
            :class='getChoiceClasses(el)'
            @click="select(el)">
      
          <LabelStyled class="check-component__choice__label"
                      :text="el.text"
                      :fontWeight="500"
                      :fontSize="14"/>
        </div>
    </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from 'vue';

import LabelStyled from '../components_styled/LabelStyled.vue';

interface IItems {
  id: string;
  text: string;
  icon?: string;
}

interface IProps {
  isWithBorder?: boolean,
  canBeEmpty?: boolean,
  withoutMultiselect?: boolean,
  title: string,
  items: IItems[],
  modelValue: string[];
}


const props = defineProps<IProps>();
const emits = defineEmits(['update:modelValue']);


const isActive = (id: string) => option.value.find((item) => item.id == id);
const resolveModel = () => props.items.filter((item) => props.modelValue.includes(item.id));


const option = ref(resolveModel());


const select = (item: IItems) => {
  if (!props.withoutMultiselect) {
    if (option.value.find((el) => el.id == item.id)) {
      if (option.value?.length <= 1 && !props.canBeEmpty) return;
      option.value = option.value.filter((el) => el.id !== item.id);
    } else {
      option.value.push(item);
    }
  } else option.value = [item];

  // const emitOptions = (option.value?.length !== props.items?.length) ? option.value.map((el) => el.id) : [];
  const emitOptions = option.value.map((el) => el.id);
  emits('update:modelValue', emitOptions);
};


const getChoiceClasses = (item: IItems) => {
  return {
    'check-component__choice__wrapper-active': isActive(item.id),
    // eslint-disable-next-line max-len
    'check-component__choice__wrapper-active check-component__choice__wrapper-active-last': isActive(item.id) && option.value?.length <= 1,
  };
};


onMounted(() => {
  if (!props.canBeEmpty) select(props.items[0]);
});


watch(props, () => {
  if (JSON.stringify(option.value) != JSON.stringify(props.modelValue)) option.value = resolveModel();
}, {deep: true});

</script>


<style lang="scss">
@import "../../assets/styles/base";

.check-component {
  &__choice {
    position: relative;
    display: grid;
    width: max-content;
    grid-auto-flow: column;
    grid-auto-columns: max-content;

    &__wrapper {
      position: relative;

      display: flex;
      align-items: center;

      cursor: pointer;
      transition: all 0.2s;

      &-active {
        cursor: pointer;

        &-last {
          pointer-events: none;
          cursor: default;
        }
      }
    }

    &__label {
      display: block;
      transition: 0.2s;
    }
  }
}
</style>
