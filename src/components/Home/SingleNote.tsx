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
} from '@mantine/core';
import { noteType } from '../../types/note';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hook';
import isColorLight from '../../utils/isColorLight';
import CardAction from '../../atoms/CardAction';
import { formatDate } from '../../helpers/dates';

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
	},
}));



export function SingleNote({ note }: { note: noteType }) {
	const { classes, cx } = useStyles();
	const { title, content, id, color, create_time } = note;
	const { user } = useAppSelector(state => state.auth)
	const isLightBG = isColorLight(color ?? '#000');

	return (
		<Card withBorder color={color} shadow='sm' radius="md" className={cx(classes.card)} >
			<Card.Section mt={-20}>
				<Box sx={{ minHeight: 50, width: '100%', background: color ?? 'grey', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
					<Text className={classes.title} color={isLightBG ? '#4A6098' : 'white'} fw={700} >
						{title}
					</Text>


				</Box>
				{create_time && <Text align='center' fz="xs" fw={600} color={'#4A6098'}>
					{formatDate(create_time)}
				</Text>}
			</Card.Section>



			{/* <Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
				{category}
			</Badge> */}

			<Link to={`/note/${id as string}`} style={{ textDecoration: 'none', color: 'inherit' }}>
				<div dangerouslySetInnerHTML={{ __html: content.slice(0, 120) }}></div>
			</Link>
			<Flex justify={'space-between'} className={classes.footer}>
				<Center>
					<Avatar size={34} radius="xl" color={color ?? 'gray'} mr="xs" >
						{user?.username.slice(0, 1)}
					</Avatar>
					<Text fz="sm" inline>
						{user?.username}
					</Text>


				</Center>


				<Group spacing={8} mr={0}>

					<CardAction note={note} />
					{/* <ActionIcon className={classes.action}>
						<Iconnotemark size="1rem" color={theme.colors.yellow[7]} />
					</ActionIcon> */}

				</Group>
			</Flex>
		</Card >
	);
}

//transparen bg from hex color 40% to hex color
const hexColor = (hex: string, opacity: number) => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);

	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
