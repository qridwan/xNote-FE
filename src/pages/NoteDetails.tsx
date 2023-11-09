/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Card,
	Image,
	Text,
	ActionIcon,
	Badge,
	Group,
	Avatar,
	Container,
	Grid,
	Flex,
	Textarea,
	Divider,
	Button,
	Tooltip,
	Dialog,
	Modal,
	Center,
	Box,
	rem,
	createStyles,
} from '@mantine/core';
import { IconCheck, IconRotate } from '@tabler/icons-react';

import { hasLength, useForm } from '@mantine/form';
import { useSinglenoteQuery } from '../redux/features/notes/noteApi';
import { useNavigate, useParams } from 'react-router-dom';
import { noteType } from '../types/note';
import { useAppSelector } from '../redux/hook';
import { IconX } from '@tabler/icons-react';
// import { IconTrashFilled } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import EditNote from '../components/Home/EditNote';
import { Link } from 'react-router-dom';
import { useDeletetrashMutation } from '../redux/features/trash/trashApi';
import notify from '../utils/notify';
import CardAction from '../atoms/CardAction';
import isColorLight from '../utils/isColorLight';
import { formatDate } from '../helpers/dates';
// import Editnote from '../components/noteDetails/Editnote';



const NoteDetails = () => {
	const { id: noteId } = useParams();
	const [opened, { toggle, close }] = useDisclosure(false);
	const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
	const { data: note } = useSinglenoteQuery(noteId as string);
	console.log('note: ', note);
	// const [deletenote, { isLoading: isDeleting }] = useDeletenoteMutation();
	const navigate = useNavigate();

	const { classes, cx } = useStyles();
	const { title, content, id, color, create_time, deleted_at, trash_id } = note?.data || {};
	const { user } = useAppSelector(state => state.auth)
	const isLightBG = isColorLight(color as string);
	const [deletetrash, { isLoading }] = useDeletetrashMutation();



	const handleDeletenote = async (): Promise<void> => {
		// const res: any = await deletenote(noteId as string);
		// console.log('res: ', res);
		// notifications.show({
		// 	id: 'success-login',
		// 	withCloseButton: true,
		// 	onClose: () => console.log('unmounted'),
		// 	onOpen: () => console.log('mounted'),
		// 	autoClose: 3000,
		// 	title: res?.data.status === 'Success' ? "note Deleted" : "Operation Failed",
		// 	message: res?.data.status === 'Success' ? res.data?.message : res?.error?.data.message,
		// 	color: res?.data.status === 'Success' ? 'cyan' : 'red',
		// 	icon: <IconX color="red"/>,
		// 	className: 'my-notification-class',
		// 	loading: false,
		// });
		close();// closing dialog
		// res?.data.status === 'Success' && navigate('/');
		return Promise.resolve();
	}

	const form = useForm({
		initialValues: {
			review: '',
		},
		validate: {
			// email: isEmail('Invalid email'),
			review: hasLength({ min: 1, max: 500 }, 'Invalid Review'),
		},
	});
	// props: noteType


	return (
		<Container size={'md'}>
			<Grid>

				<Grid.Col span={8}
				>
					<Box sx={{ minHeight: 50, width: '100%', background: color ?? 'grey', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
						<Text className={classes.title} color={isLightBG ? '#4A6098' : 'white'} fw={700} >
							{title}
						</Text>


					</Box>
					{create_time && <Text align='center' fz="xs" fw={600} color={'#4A6098'}>
						{formatDate(create_time as string)}
					</Text>}
					{deleted_at && <Text align='center' fz="xs" fw={600} color={'red'}>
						Deleted At: {formatDate(deleted_at as string)}
					</Text>}



				</Grid.Col>
			</Grid>
			{user?.username && <Group p="right" >
				<Group spacing={8} mr={0} p='right'>



				</Group>
			</Group>}
			<Link to={`/note/${id as string}`} style={{ textDecoration: 'none', color: 'inherit' }}>
				<div dangerouslySetInnerHTML={{ __html: content }} style={{ marginBottom: '30px' }}></div>
			</Link>
			<Box className={classes.footer}>
				<Flex justify={'space-between'} >
					<Center>
						<Avatar size={34} radius="xl" color={color ?? 'gray'} mr="xs" >
							{user?.username.slice(0, 1)}
						</Avatar>
						<Text fz="sm" inline>
							{user?.username}
						</Text>


					</Center>


					<Group spacing={8} mr={0}>

						{trash_id ? <Tooltip label="Put Back" color='green' withArrow><ActionIcon disabled={isLoading} onClick={async () => {
							const res: any = await deletetrash(trash_id?.toString() as string);

							const isSuccess = Boolean(res?.data?.status === 'Success');
							const icon = isSuccess ? <IconCheck /> : <IconX color="red" />;
							notify(isSuccess, "Note successfully restored!", icon);

						}} color='green' className={classes.action}>
							<IconRotate size="1rem" color={'green'} />
						</ActionIcon></Tooltip> : <CardAction note={note} />}


					</Group>
				</Flex>


				{/* Edit modal */}
				<Modal size="calc(100vw - 60vw)" opened={openedEdit} onClose={closeEdit} title="" centered>
					<EditNote note={note?.data as noteType} close={closeEdit} />
				</Modal>

			</Box>
		</Container>
	);
};

export default NoteDetails;




const useStyles = createStyles((theme) => ({
	card: {
		position: 'relative',
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
	},

	rating: {
		position: 'absolute',
		top: theme.spacing.xs,
		right: rem(12),
		pointerEvents: 'none',
	},

	title: {
		display: 'block',
		marginTop: theme.spacing.md,
		marginBottom: rem(5),
		padding: '4px',
		textAlign: 'center',
		// color: "white",
		// textDecoration: '0',
	},

	action: {
		// backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
		// ...theme.fn.hover({
		// 	backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
		// }),
	},

	footer: {
		marginTop: theme.spacing.xs,

		position: 'absolute',
		bottom: 4,
		left: 4,
		width: '90%'
	},
}));