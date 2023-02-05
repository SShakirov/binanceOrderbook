import {type IId} from '@/store/types';

export interface IPushNotification extends IPushNotificationBody, IId {}

export interface IPushNotificationBody {
  type: EPushNotificationType,
  message: string,
}

export enum EPushNotificationType {
  INFO = 'info',
  ERROR = 'error',
  SUCCESS = 'success',
}
