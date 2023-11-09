import { useState } from 'react';
import {
	createStyles,
	rem,
	AppShell,
	Box
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../components/shared/Footer';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { userLoggedOut } from '../redux/features/auth/authSlice';
import XHeader from '../components/layouts/Header';
import { XSidebar } from '../components/layouts/Sidebar';
// gradient 
const useStyles = createStyles((theme) => ({
	header: {
		paddingTop: theme.spacing.sm,
		backgroundColor: '#eeeeee',
		borderBottom: theme.colors.yellow,
		marginBottom: rem(10),
	},

	mainSection: {
		paddingBottom: theme.spacing.sm,
	},

	user: {
		color: 'grey',
		padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
		borderRadius: theme.radius.sm,
		transition: 'background-color 100ms ease',

		'&:hover': {
			// backgroundColor: theme.fn.lighten(
			// 	theme.fn.variant({ variant: 'filled', }).background!,
			// 	0.1
			// ),
		},

		[theme.fn.smallerThan('xs')]: {
			display: 'none',
		},
	},

	burger: {
		[theme.fn.largerThan('xs')]: {
			display: 'none',
		},
	},

	userActive: {
		// backgroundColor: theme.fn.lighten(
		// 	theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
		// 	0.1
		// ),
	},

	tabs: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},

	tabsList: {
		borderBottom: '0 !important',
	},

	tab: {
		fontWeight: 500,
		height: rem(38),
		color: theme.white,
		backgroundColor: 'transparent',
		borderColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,

		'&:hover': {
			// backgroundColor: theme.fn.lighten(
			// 	theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
			// 	0.1
			// ),
		},

		'&[data-active]': {
			// backgroundColor: theme.fn.lighten(
			// 	theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
			// 	0.1
			// ),
			borderColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
		},
	},
}));

export function MainLayout() {
	const { user } = useAppSelector(state => state.auth);
	const { classes, theme, cx } = useStyles();
	const [opened, { toggle }] = useDisclosure(false);
	const [userMenuOpened, setUserMenuOpened] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// const items = tabs.map((tab) => (
	// 	<Tabs.Tab value={tab} key={tab}>
	// 		{tab}
	// 	</Tabs.Tab>
	// ));
	const logout = () => {
		dispatch(userLoggedOut());
		localStorage.clear();
	};

	return (
		<>

			<AppShell
				padding="md"
				navbar={<XSidebar />}
				header={<XHeader />}
				styles={(theme) => ({

					main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], minHeight: 'auto', height: '80vh' },
				})}
				footer={
					<Footer />}
			>
				<Box mih={'auto'}>
					<Outlet />
				</Box>
			</AppShell>

		</>

	);
}