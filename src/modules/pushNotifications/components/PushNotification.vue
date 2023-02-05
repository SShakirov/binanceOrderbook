<template>
  <div :class="`notification-block notification-block__${props.notification.type}`"
       @click="closeNotification(props.notification)">

    <slot/>

    <ButtonStyled class="notification-block__button-close"
                  :fontSize="18"
                  :fontWeight="400"
                  :fontLineHeight="100"
                  iconUrl="'/icons/cross.svg'"
                  iconType="svg"
                  type="label"
                  subtype="label-icon"/>

    <div class="notification-block__message">
      <div class="note">
        <LabelComponent class="title"
                        :text="getNotification.type"
                        :fontWeight="500"
                        :fontSize="18"/>

        <LabelComponent class="description"
                        :text="getNotification.message"
                        :fontWeight="400"
                        :fontSize="14"/>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {computed} from 'vue';

import {EPushNotificationType, type IPushNotification} from '../store/types';

import LabelComponent from '@/UI/components/LabelComponent.vue';
import ButtonStyled from '@/UI/components_styled/ButtonStyled.vue';



interface IProps {
  notification: IPushNotification,
}


const props = withDefaults(defineProps<IProps>(), {
  notification:():IPushNotification => ({
    id: 0,
    type: EPushNotificationType.ERROR,
    message: 'some error',
  }) 
});

const emit = defineEmits({
  close: (payload: IPushNotification) => payload,
});


const getNotification = computed(() => props.notification);

const closeNotification = (obj: IPushNotification) => emit('close', obj);

</script>


<style lang="scss">
@import '../../../assets/styles/base';

.notification-block {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 15px;

  display: flex;
  align-items: center;
  gap: 15px;

  background: white;
  border-radius: 10px;
  box-shadow: 2px 2px 33px rgba(0, 0, 0, 0.15);

  &__button-close {
    position: absolute;
    top: 8px;
    right: 8px;

    z-index: 2;

    .icon {
      --icon-height: 18;
      --icon-width: 18;

      background: #000 !important;
    }

    .button {
      margin-right: 0;
    }
  }

  &__message {
    font-size: 12px;
    color: black;
    position: relative;
  }

  &__info .note .title    { color: black; }
  &__error .note .title   { color: red;   }
  &__success .note .title { color: green; }

  .note {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    word-break: break-word;

    .title {
      margin-bottom: 10px;
    }
  }
}

</style>
