/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Text,
	ActionIcon,
	Group,
	Avatar,
	Container,
	Grid,
	Flex,
	Tooltip,
	Modal,
	Center,
	Box,
	rem,
	createStyles,
	ScrollArea,
} from '@mantine/core';
import { IconArrowLeft, IconCheck, IconRotate } from '@tabler/icons-react';
import { useSinglenoteQuery } from '../redux/features/notes/noteApi';
import { useNavigate, useParams } from 'react-router-dom';
import { noteType } from '../types/note';
import { useAppSelector } from '../redux/hook';
import { IconX } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import EditNote from '../components/Home/EditNote';
import { useDeletetrashMutation } from '../redux/features/trash/trashApi';
import notify from '../utils/notify';
import CardAction from '../atoms/CardAction';
import isColorLight from '../utils/isColorLight';
import { formatDate } from '../helpers/dates';
import BoiLoader from '../atoms/Loader';
import NoteDetailsSkeleton from '../components/skeletons/NoteDetails';

const NoteDetails = () => {
	const { id: noteId } = useParams();
	const [openedEdit, { close: closeEdit }] = useDisclosure(false);
	const { data: note, isLoading: isFetchLoading } = useSinglenoteQuery(noteId as string, { refetchOnMountOrArgChange: true });
	const navigate = useNavigate();
	const { classes } = useStyles();
	const { title, content, color, create_time, deleted_at, trash_id } = note?.data || {};
	const { user } = useAppSelector(state => state.auth)
	const isLightBG = isColorLight(color as string);
	const [deletetrash, { isLoading }] = useDeletetrashMutation();

	return (
		<Container size={'md'}>
			{
				isFetchLoading ? <Box mt={20}>
					<NoteDetailsSkeleton />
				</Box> : <>
					<Grid justify='center' align='start'>
						<Grid.Col span={1}
						>
							<ActionIcon color='grey' size={'lg'} onClick={() => navigate(-1)}>
								<IconArrowLeft />
							</ActionIcon>
						</Grid.Col>
						<Grid.Col span={11}
						>
							<Box sx={{ width: '100%', background: color ?? 'grey', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
								<Text fz={18} className={classes.title} color={isLightBG ? '#4A6098' : 'white'} fw={700} >
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


					<Box style={{ textDecoration: 'none', color: 'inherit', border: `1px dashed ${color as string ?? 'grey'}`, margin: '10px' }}>
						<ScrollArea h={'68vh'} type="never" >
							<div dangerouslySetInnerHTML={{ __html: content }} style={{ margin: '30px' }}></div>
						</ScrollArea>
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
									</ActionIcon></Tooltip> : <CardAction note={note?.data} />}


								</Group>
							</Flex>


							{/* Edit modal */}
							<Modal size="calc(100vw - 60vw)" opened={openedEdit} onClose={closeEdit} title="" centered>
								<EditNote note={note?.data as noteType} close={closeEdit} />
							</Modal>

						</Box>
					</Box>
				</>
			}


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
		margin: theme.spacing.md,
	},
}));