
import { NotificationManager } from 'react-notifications';

export const showNotification = (type, text, timeOut = 0) => {
  switch (type) {
      case 'info':
          NotificationManager.info(text);
          break;
      case 'success':
          NotificationManager.success('Success', text);
          break;
      case 'warning':
          NotificationManager.warning('Warning', text, timeOut);
          break;
      case 'error':
          NotificationManager.error(text, 'Error', timeOut);
          break;
      default:
          break;
  }
}
