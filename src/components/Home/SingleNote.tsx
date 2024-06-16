import {
	Card,
	Text,
	Group,
	Center,
	Avatar,
	createStyles,
	rem,
	Box,
	Flex,
	ActionIcon,
	Tooltip,
	Kbd,
} from '@mantine/core';
import { noteType } from '../../types/note';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hook';
import isColorLight from '../../utils/isColorLight';
import CardAction from '../../atoms/CardAction';
import { formatDate } from '../../helpers/dates';
import { IconCheck, IconRotate, IconTrash, IconX } from '@tabler/icons-react';
import { useDeletetrashMutation } from '../../redux/features/trash/trashApi';
import notify from '../../utils/notify';
import { useDeletenoteMutation } from '../../redux/features/notes/noteApi';

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



export function SingleNote({ note }: { note: noteType }) {
	const { classes, cx } = useStyles();
	const { title, content, id, color, create_time, deleted_at, trash_id, note_id } = note;
	const { user } = useAppSelector(state => state.auth)
	const isLightBG = isColorLight(color ?? '#000');
	const [deletetrash, { isLoading }] = useDeletetrashMutation();
	const [deletenote, { isLoading: isNoteLoading }] = useDeletenoteMutation();

	return (
		<Card withBorder h="100%" color={color} shadow='sm' radius="md" className={cx(classes.card)} >
			<Link to={trash_id ? '' : `/note/${id as string}`} style={{ textDecoration: 'none', color: 'inherit' }}>
				<Card.Section mt={-20}>
					<Box sx={{ minHeight: 50, width: '100%', background: color ?? 'grey', display: 'flex', justifyContent: 'center', alignItems: 'center', }} >
						<Text truncate="end" className={classes.title} color={isLightBG ? '#4A6098' : 'white'} fw={700} >
							{title}{title}
						</Text>
					</Box>
					{create_time && <Text align='center' fz="xs" fw={600} color={'#4A6098'}>
						{formatDate(create_time)}
					</Text>}
					{deleted_at && <Text align='center' fz="xs" fw={600} color={'red'}>
						Deleted At: {formatDate(deleted_at)}
					</Text>}
				</Card.Section>



				{/* <Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
				{category}
			</Badge> */}

				<div dangerouslySetInnerHTML={{ __html: content.length > 50 ? `${content.slice(0, 50)}...` : content }} style={{ marginBottom: '30px' }}></div>
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

						{trash_id ? <>
							<Tooltip label="Put Back" color='green' withArrow><ActionIcon disabled={isLoading} onClick={async () => {
								const res: any = await deletetrash(trash_id.toString()!);

								const isSuccess = Boolean(res?.data?.status === 'Success');
								const icon = isSuccess ? <IconCheck /> : <IconX color="red" />;
								notify(isSuccess, "Note successfully restored!", icon);

							}} color='green' className={classes.action}>
								<IconRotate size="1rem" color={'green'} />
							</ActionIcon></Tooltip>
							<Tooltip label="Delete Permanently ⚠️" color='red' withArrow><ActionIcon disabled={isNoteLoading} onClick={async () => {
								const res: any = await deletenote(note_id?.toString() as string);
								const isSuccess = Boolean(res?.data?.status === 'Success');
								const icon = isSuccess ? <IconCheck /> : <IconX color="red" />;
								notify(isSuccess, "Note deleted!", icon);
							}} color='red' className={classes.action}>
								<IconTrash size="1rem" color={'red'} />
							</ActionIcon></Tooltip>

						</> : <>
							<CardAction note={note} />
						</>}


					</Group>
				</Flex>
			</Box>
		</Card >
	);
}


