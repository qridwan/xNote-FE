import { createStyles, Header, Group, Container, Burger, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import BrandLogo from '../atoms/BrandLogo';
import { Outlet } from 'react-router-dom';
import Social from '../components/shared/Social';


const useStyles = createStyles((theme) => ({
	inner: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: rem(66),

		[theme.fn.smallerThan('sm')]: {
			justifyContent: 'flex-start',
		},
	},

	links: {
		width: rem(260),

		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},

	social: {
		width: rem(260),

		[theme.fn.smallerThan('sm')]: {
			width: 'auto',
			marginLeft: 'auto',
		},
	},

	burger: {
		marginRight: theme.spacing.md,

		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},

	link: {
		display: 'block',
		lineHeight: 1,
		padding: `${rem(8)} ${rem(12)}`,
		borderRadius: theme.radius.sm,
		textDecoration: 'none',
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
		},
	},

	linkActive: {
		'&, &:hover': {
			backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
			color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
		},
	},
}));



export default function AuthLayout() {
	const [opened, { toggle }] = useDisclosure(false);

	// console.log('setActive: ', setActive);
	const { classes } = useStyles();


	return (
		<>

			<Header height={56} mb={40}>
				<Container className={classes.inner}>
					<Burger opened={opened} onClick={toggle} size="sm" className={classes.burger} />
					<Group className={classes.links} spacing={5}>
						{/* {items} */}
						<BrandLogo />
					</Group>
					<Social />
				</Container>
			</Header>
			<Outlet />

		</>
	);
}