import { notifications } from "@mantine/notifications";

const notify = (isSuccess: boolean, sMessage: string, icon: JSX.Element) => {
  notifications.show({
    id: "success-login",
    withCloseButton: true,
    autoClose: 3000,
    title: isSuccess ? sMessage : "Operation Failed",
    message: isSuccess
      ? sMessage
      : "Something went wrong, please try again later",
    color: isSuccess ? "grey" : "red",
    icon: icon,
    className: "my-notification-class",
    style: { backgroundColor: "" },
    loading: false,
  });

  return;
};

export default notify;
