import { ActionIcon, Modal, Flex } from '@mantine/core';
import { IconCheck, IconEdit, IconX } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import notify from '../utils/notify';
import { notebookType } from '../types/notebook';
import EditNotebookForm from '../components/NoteBook/EditNoteBookForm';
import { useDeletenotebookMutation } from '../redux/features/notebook/notebookApi';

const NotebookAction = ({ notebook, css }: { notebook: notebookType, css: CSSModuleClasses[''] }) => {
	const [opened, { open, close }] = useDisclosure(false);
	const [deleteNotebook] = useDeletenotebookMutation();
	return (
		<>
			<Modal fullScreen
				radius={0}

				transitionProps={{ transition: 'fade', duration: 200 }}
				shadow='sm' bg={'dark'} opened={opened} onClose={close}>
				<h2>Edit NoteBook</h2>
				<EditNotebookForm existingNb={notebook} close={close} />
				{/* <EditNote note={note} close={close} /> */}
			</Modal>
			<Flex justify={'space-evenly'}>
				<ActionIcon color='gray' className={css}>
					<IconEdit onClick={open} size="1rem" />
				</ActionIcon>
				<ActionIcon color='gray' className={css}>
					<IconX onClick={async () => {
						const res: any = await deleteNotebook(notebook.id as string);
						const isSuccess = Boolean(res?.data?.status === 'Success');
						const icon = isSuccess ? <IconCheck /> : <IconX color="red" />;
						notify(isSuccess, "Notebook moved to trash, you can retrieve it later", icon);
					}} size="1rem" color='red' />
				</ActionIcon>
			</Flex>
			{/* <Menu width={200} shadow="md">
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
						Edit Notebook
					</Menu.Item>
					<Menu.Item
						color='red'
						disabled={isLoading}
						icon={isLoading ? <IconLoader /> : <IconX size={rem(14)} />}
						onClick={async () => {
							const res: any = await addtrash({ note_id: notebook.id as number });
							const isSuccess = Boolean(res?.data?.status === 'Success');
							const icon = isSuccess ? <IconCheck /> : <IconX color="red" />;
							notify(isSuccess, "Notebook moved to trash, you can retrieve it later", icon);
						}}
					>
						Delete
					</Menu.Item>
				</Menu.Dropdown>
			</Menu> */}
		</>

	);
};

export default NotebookAction;