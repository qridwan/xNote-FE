import { Button, Container, Grid, Modal, Skeleton, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { createStyles, Title, rem } from '@mantine/core';
import { Dots } from '../atoms/Dots';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hook';
import AddNote from '../components/Home/AddNote';
import { useGettrashQuery } from '../redux/features/trash/trashApi';
import { useEffect } from 'react';

const Home = () => {
	const { classes } = useStyles();
	const navigate = useNavigate();
	const [opened, { open, close }] = useDisclosure(false);
	const { user } = useAppSelector(state => state.auth);
	const { isLoading } = useGettrashQuery({}, { refetchOnMountOrArgChange: true });

	useEffect(() => {
		user?.username && navigate("/all")
	}, [user])

	return (
		<Container size="lg" px="xs">
			{isLoading ? <Skeleton variant="rectangle" animate height={"70vh"} width={"100%"} /> : <Grid>
				{/* TOP */}
				<Modal size={'lg'} bg={'dark'} opened={opened} onClose={close} centered>
					<AddNote />
				</Modal>


				{/* MAIN PART */}
				<Grid.Col span={12}>
					<Grid align='end' justify='center' my={10} >
						<Container className={classes.wrapper} size={1400}>
							<Dots className={classes.dots} style={{ left: 0, top: 0 }} />
							<Dots className={classes.dots} style={{ left: 60, top: 0 }} />
							<Dots className={classes.dots} style={{ left: 0, top: 140 }} />
							<Dots className={classes.dots} style={{ right: 0, top: 60 }} />

							<div className={classes.inner}>
								<Title className={classes.title}>
									{' '}
									<Text component="span" className={classes.highlight} inherit>
										xNote
									</Text>{' '}
									<br />
									A smart note taking app
								</Title>

								<Container p={0} size={600}>
									<Text size="lg" color="dimmed" className={classes.description}>
										Unlocking Brilliance, One Note at a Time
									</Text>
								</Container>

								<div className={classes.controls}>

									{user?.username ? <Button onClick={open} className={classes.control} size="lg">
										Add New Note
									</Button> : <Button className={classes.control} onClick={() => navigate("/auth/login")} size="lg" variant='gradient' color="gray">
										Get Started
									</Button>}
								</div>
							</div>
						</Container>
					</Grid>
					{/* <ScrollArea h={{ md: 400, lg: 450 }} type="never" >
						<Text fs={'revert'} sx={{ fontSize: 25, textAlign: 'center' }} fw={700} my={30} inline>
							Featured notes
						</Text>
						<BookLists type='feature' books={featData?.data} isLoading={featLoading} />
					</ScrollArea> */}
				</Grid.Col>

			</Grid >}
		</Container >
	);
};

export default Home;



const useStyles = createStyles((theme) => ({
	wrapper: {
		position: 'relative',
		paddingTop: rem(120),
		paddingBottom: rem(80),

		[theme.fn.smallerThan('sm')]: {
			paddingTop: rem(80),
			paddingBottom: rem(60),
		},
	},

	inner: {
		position: 'relative',
		zIndex: 1,
	},

	dots: {
		position: 'absolute',
		color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],

		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},

	dotsLeft: {
		left: 0,
		top: 0,
	},

	title: {
		textAlign: 'center',
		fontWeight: 800,
		fontSize: rem(40),
		letterSpacing: -1,
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		marginBottom: theme.spacing.xs,
		fontFamily: `Greycliff CF, ${theme.fontFamily!}`,

		[theme.fn.smallerThan('xs')]: {
			fontSize: rem(28),
			textAlign: 'left',
		},
	},

	highlight: {
		color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
	},

	description: {
		textAlign: 'center',

		[theme.fn.smallerThan('xs')]: {
			textAlign: 'left',
			fontSize: theme.fontSizes.md,
		},
	},

	controls: {
		marginTop: theme.spacing.lg,
		display: 'flex',
		justifyContent: 'center',

		[theme.fn.smallerThan('xs')]: {
			flexDirection: 'column',
		},
	},

	control: {
		'&:not(:first-of-type)': {
			marginLeft: theme.spacing.md,
		},

		[theme.fn.smallerThan('xs')]: {
			height: rem(42),
			fontSize: theme.fontSizes.md,

			'&:not(:first-of-type)': {
				marginTop: theme.spacing.md,
				marginLeft: 0,
			},
		},
	},
}));