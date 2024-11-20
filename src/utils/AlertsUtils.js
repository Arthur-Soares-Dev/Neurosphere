import {ALERT_TYPE, Dialog, Toast} from "react-native-alert-notification";

export default class AlertsUtils {
  static dangerToast = (
      title = "",
      message = ""
    ) => {
    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: title,
      textBody: message,
      duration: 2000,
    });
  };

  static successToast = (
    title = "",
    message = ""
  ) => {
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: title,
      textBody: message,
      duration: 2000,
    });
  };

  static warningDialog = (
      title = "",
      message = ""
    ) => {
      Dialog.show({
      type: ALERT_TYPE.WARNING,
      title: title,
      textBody: message,
      button: 'CLOSE',
    });
  };

  static successDialog = (
    title = "",
    message = ""
  ) => {
      Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: title,
      textBody: message,
      button: 'CLOSE',
    });
  };

}