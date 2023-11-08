
import { Menu, rem, ActionIcon, Modal } from '@mantine/core';
import { IconAdjustmentsAlt, IconEdit, IconLoader, IconTrashX, IconX } from '@tabler/icons-react';
import { noteType } from '../types/note';
import { useDisclosure } from '@mantine/hooks';
import EditNote from '../components/Home/EditNote';
import { useAddtrashMutation } from '../redux/features/trash/trashApi';
import { notifications } from '@mantine/notifications';



const CardAction = ({ note }: { note: noteType }) => {
	const [opened, { open, close }] = useDisclosure(false);
	const [addtrash, { isLoading }] = useAddtrashMutation();
	return (
		<>
			<Modal size={'xl'} shadow='sm' bg={'dark'} opened={opened} onClose={close} centered>
				<EditNote note={note} close={close} />
			</Modal>
			<Menu width={200} shadow="md">
				<Menu.Target>
					<ActionIcon variant="outline" color="gray" radius="xl" size="xs">
						<IconAdjustmentsAlt size={18} />
					</ActionIcon>
				</Menu.Target>

				<Menu.Dropdown>


					<Menu.Item
						icon={<IconEdit size={rem(14)} />}
						onClick={open}

					>
						Edit Note
					</Menu.Item>
					<Menu.Item
						color='red'
						disabled={isLoading}
						icon={isLoading ? <IconLoader /> : <IconTrashX size={rem(14)} />}
						onClick={async () => {
							const res: any = await addtrash({ note_id: note.id as number });
							notifications.show({
								id: 'success-login',
								withCloseButton: true,
								onClose: () => console.log('unmounted'),
								onOpen: () => console.log('mounted'),
								autoClose: 3000,
								title: res?.data.status === 'Success' ? "Note moved to trash, you can retrieve it later" : "Operation Failed",
								message: res?.data.status === 'Success' ? res.data?.message : res?.error?.data.message,
								color: res?.data.status === 'Success' ? 'cyan' : 'red',
								icon: <IconX />,
								className: 'my-notification-class',
								style: { backgroundColor: '' },
								loading: false,
							});
						}}

					>
						Move to trash
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</>

	);
};

export default CardAction;