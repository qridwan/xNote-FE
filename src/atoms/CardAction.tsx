import { Menu, rem, ActionIcon, Modal } from '@mantine/core';
import { IconCheck, IconEdit, IconLoader, IconTrashX, IconX, IconDotsVertical } from '@tabler/icons-react';
import { noteType } from '../types/note';
import { useDisclosure } from '@mantine/hooks';
import EditNote from '../components/Home/EditNote';
import { useAddtrashMutation } from '../redux/features/trash/trashApi';
import notify from '../utils/notify';



const CardAction = ({ note }: { note: noteType }) => {
	const [opened, { open, close }] = useDisclosure(false);
	const [addtrash, { isLoading }] = useAddtrashMutation();
	return (
		<>
			<Modal fullScreen
				radius={0}
				transitionProps={{ transition: 'fade', duration: 200 }}
				shadow='sm' bg={'dark'} opened={opened} onClose={close}>
				<EditNote note={note} close={close} />
			</Modal>
			<Menu width={200} shadow="md">
				<Menu.Target>
					<ActionIcon variant='transparent' color="gray" radius="xl" size="xs">
						<IconDotsVertical size={18} />
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


							const isSuccess = Boolean(res?.data?.status === 'Success');
							const icon = isSuccess ? <IconCheck /> : <IconX color="red" />;
							notify(isSuccess, "Note moved to trash, you can retrieve it later", icon);
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

