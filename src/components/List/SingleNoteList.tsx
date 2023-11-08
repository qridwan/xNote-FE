/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-unsafe-optional-chaining */
import {
	Card,

	Text,
	Badge,
	Group,
	Center,
	Avatar,
	createStyles,
	rem,
	Box,
	ActionIcon,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import CardAction from '../../atoms/CardAction';
import isColorLight from '../../utils/isColorLight';
import { noteType } from '../../types/note';
import { useAppSelector } from '../../redux/hook';

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
		color: "white",
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
	},
}));



export function SinglenoteList({ note }: { note: noteType }) {
	const { classes, cx, } = useStyles();
	const { title, id, content, color } = note;
	const { user } = useAppSelector(state => state.auth);
	const isLightBG = isColorLight(note?.color ?? '#000');


	return (
		<>
			{
				title ? <Card withBorder radius="md" className={cx(classes.card)} >
					<Card.Section mt={-20}>
						<Box sx={{ height: 100, width: '100%', background: color ?? 'grey', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
							<Text className={classes.title} color={isLightBG ? '#4A6098' : 'white'} fw={700} >
								{title}
							</Text>
						</Box>
					</Card.Section>



					<Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
						{/* {category} */}
					</Badge>


					<Link to={`/note/${id as string}`}></Link>
					<Text fz="sm" color="dark" lineClamp={4}>
						{content}
					</Text>

					<Group className={classes.footer}>
						<Center>
							<Avatar size={24} radius="xl" color='cyan' mr="xs" >
								{user?.username.slice(0, 1)}
							</Avatar>
							<Text fz="sm" inline>
								{user?.username}
							</Text>

						</Center>


						<Group spacing={8} mr={0}>

							<CardAction />
							{/* <ActionIcon className={classes.action}>
							<Iconnotemark size="1rem" color={theme.colors.yellow[7]} />
						</ActionIcon> */}

						</Group>
					</Group>
				</Card > : null
			}
		</>
	);
}