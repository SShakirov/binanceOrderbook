<template>
  <transition-group name="list-notifications" tag="div"
                    class="notifications-area">

    <template v-for="item in getPushNotifications" :key="item">
      <PushNotification :notification="item"
                        class="list-notifications-item"
                        @close="closeNotification(item)"/>

    </template>

  </transition-group>
</template>


<script setup lang="ts">
import {computed} from 'vue';

import usePushNotificationModule from '../store';
import {type IPushNotification} from '../store/types';

import PushNotification from './PushNotification.vue';

const pushNotificationModule = usePushNotificationModule();


const getPushNotifications = computed(() => pushNotificationModule.getPushNotificationsList);


const closeNotification = (obj: IPushNotification) => {
  pushNotificationModule.deleteNotification(obj.id);
};

</script>


<style lang="scss">
@import '../../../assets/styles/base';


.notifications-area {
  position: fixed;
  top: 20px;
  left: 20px;
  right: 20px;
  max-width: 400px;

  display: flex;
  flex-direction: column;
  z-index: 100;
}

.list-notifications-item {
  transition: opacity 1s;
  margin-bottom: 20px;
}

.list-notifications-enter, .list-notifications-leave-to {
  opacity: 0;
}

.list-complete-leave-active {
  position: absolute;
}

</style>
