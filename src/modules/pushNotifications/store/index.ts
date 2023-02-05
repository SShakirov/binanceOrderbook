import {defineStore} from 'pinia';
import {computed} from 'vue';

import {EPushNotificationType, type IPushNotification, type IPushNotificationBody} from './types';

import objectsListHook from '@/shared/hooks/objectsListHook';




const hook = objectsListHook<IPushNotification>();

// eslint-disable-next-line new-cap
export const usePushNotificationModule = defineStore('pushNotificationModule', () => {
  const getPushNotificationsList = computed((): IPushNotification[] => {
    return hook.getList.value;
  });


  const sendNotification = async (obj : IPushNotificationBody): Promise<IPushNotification> => {
    const currentObj = await hook.addListItem({...obj, id: -1} as IPushNotification);
    setTimeout(() => hook.deleteItem(currentObj.id), 4000);

    return currentObj;
  };

  const deleteNotification = async (id: number | string) => {
    hook.deleteItem(id);
  };

  const sendInfoNotification = async (message: string): Promise<IPushNotification> => {
    return await sendNotification({type: EPushNotificationType.INFO, message});
  };

  const sendSuccessNotification = async (message: string): Promise<IPushNotification> => {
    return await sendNotification({type: EPushNotificationType.SUCCESS, message});
  };

  const sendErrorNotification = async (message: string): Promise<IPushNotification> => {
    return await sendNotification({type: EPushNotificationType.ERROR, message});
  };


  return {
    getPushNotificationsList,

    sendNotification,
    deleteNotification,
    sendInfoNotification,
    sendSuccessNotification,
    sendErrorNotification,
  };
});

export default usePushNotificationModule;
