import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

const Notify = ({ res, sMessage }: { res: any, sMessage: string }) => {
	notifications.show({
		id: 'success-login',
		withCloseButton: true,
		autoClose: 3000,
		title: res?.data.status === 'Success' ? sMessage : "Operation Failed",
		message: res?.data.status === 'Success' ? res.data?.message : res?.error?.data.message,
		color: res?.data.status === 'Success' ? 'grey' : 'red',
		icon: <IconX color="red" />,
		className: 'my-notification-class',
		style: { backgroundColor: '' },
		loading: false,
	});

	return;
};

export default Notify;