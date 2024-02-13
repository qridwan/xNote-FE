import { Box, Button, Flex, Modal } from '@mantine/core';
import { useDeleteAllTrashMutation } from '../../redux/features/trash/trashApi';
import notify from '../../utils/notify';
import { IconCheck, IconInfoTriangle } from '@tabler/icons-react';

const ConfirmModal = ({ opened, setOpen }: {
	opened: boolean,
	setOpen: (s: boolean) => void
}) => {

	const [deleteAllTrash, { isLoading }] = useDeleteAllTrashMutation();

	const handleDelete = async () => {
		const resp: any = await deleteAllTrash({});

		if (resp.data?.status === 'Success') {
			setOpen(false);
			notify(true, "All trashed notes deleted successfully!", <IconCheck />);

		} else {
			setOpen(false);
			notify(false, "Failed to delete trashed notes!", <IconInfoTriangle />);
		}
	};

	return (
		<div>
			<Modal
				opened={opened}
				onClose={() => !isLoading && setOpen(false)}
				title="Extra caution required!"
				transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'linear' }}
			>
				<Box p={20}>
					Are you sure you want to remove all trashed notes?

					<Flex justify="flex-end" my={20} gap={20}>
						<Button disabled={isLoading} variant="light" color='green' onClick={() => setOpen(false)}>Cancel</Button>
						<Button disabled={isLoading} variant="gradient" gradient={{ from: 'red', to: '#ec8c69', deg: 35 }} onClick={handleDelete}>{isLoading ? "Deleting..." : "Delete"}</Button>
					</Flex>
				</Box>
			</Modal>
		</div>
	);
};

export default ConfirmModal;