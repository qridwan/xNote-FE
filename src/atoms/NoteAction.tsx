import { Menu, ActionIcon, Modal, rem } from '@mantine/core';
import { IconAdjustmentsHorizontal, IconEdit, IconLoader, IconTrashX, IconX, IconCheck } from '@tabler/icons-react';
import EditNote from '../components/Home/EditNote';
import { useDisclosure } from '@mantine/hooks';
import { useAddtrashMutation } from '../redux/features/trash/trashApi';
import notify from '../utils/notify';
import { noteType } from '../types/note';

export default function NoteAction({ note }: { note: noteType }) {
	const [opened, { open, close }] = useDisclosure(false);
	const [addtrash, { isLoading }] = useAddtrashMutation();
	return (
		<section style={{
			position: 'fixed',
			right: '0',
			top: '20%',
			zIndex: 150,
		}}>

			<Menu shadow="md" width={200} trigger="hover" openDelay={100} closeDelay={400}>
				<Menu.Target>
					{/* <Button leftIcon={<IconAdjustmentsHorizontal/>}></Button> */}

					<ActionIcon color="light" size="xl" radius="md">
						<div style={{ background: '#1C1D1F', padding: '4px', width: '100px', borderRadius: '20px  0 0 20px' }}>
							<IconAdjustmentsHorizontal size="2.125rem" />
						</div>
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

			<Modal fullScreen
				radius={0}
				transitionProps={{ transition: 'fade', duration: 200 }}
				shadow='sm' bg={'dark'} opened={opened} onClose={close}>
				<EditNote note={note} close={close} />
			</Modal>
		</section>
	);
}

