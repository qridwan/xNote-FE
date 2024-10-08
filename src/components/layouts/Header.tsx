import { useState } from 'react';
import {
	createStyles,
	Container,
	Avatar,
	UnstyledButton,
	Group,
	Text,
	Menu,
	Burger,
	rem,
	Button,
	Drawer,
	Flex
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
	IconLogout,

	IconChevronDown,
	IconTrashFilled,
	IconClipboardList,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom'
import BrandLogo from '../../atoms/BrandLogo';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { userLoggedOut } from '../../redux/features/auth/authSlice';
import { XSidebar } from '../../components/layouts/Sidebar';
import { setSidebar } from '../../redux/features/notes/noteSlice';

const XHeader = () => {
	const { user } = useAppSelector(state => state.auth);
	const { classes, theme, cx } = useStyles();
	const [opened, { toggle }] = useDisclosure(false);
	const [pcopened, { toggle: pctoggle }] = useDisclosure(false);
	const [userMenuOpened, setUserMenuOpened] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch()
	const logout = () => {
		dispatch(userLoggedOut());
		localStorage.clear();
	};
	const label = opened ? 'Close navigation' : 'Open navigation';

	return (
		<div className={classes.header}>
			<Container className={classes.mainSection}>
				<Group position="apart">
					<Flex gap={3} justify={'center'} align={'center'}>
						<Burger
							className={classes.burger_pc} opened={pcopened} onClick={() => {
								pctoggle();
								dispatch(setSidebar(pcopened ? 'default' : 'short'))
							}} aria-label={label} />

						<BrandLogo />
					</Flex>

					<Burger
						opened={opened}
						onClick={toggle}
						className={classes.burger_sp}
						size="sm"
					// color={theme.white}
					/>

					<Drawer
						opened={opened}
						onClose={toggle}
						title="xNote"
						overlayProps={{ opacity: 0.5, blur: 4 }}
					>
						<XSidebar toggle={toggle} />
					</Drawer>

					{user?.username ? <Menu
						width={260}
						position="bottom-end"
						transitionProps={{ transition: 'pop-top-right' }}
						onClose={() => setUserMenuOpened(false)}
						onOpen={() => setUserMenuOpened(true)}
						withinPortal
					>
						<Menu.Target>
							<UnstyledButton
								className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
							>
								<Group spacing={7}>
									<Avatar color='grey' radius="xl" size={30} />
									<Text weight={800} size="lg" sx={{ lineHeight: 1, color: 'grey' }} mr={3}>
										{user?.username.toUpperCase()}
									</Text>
									<IconChevronDown size={rem(12)} stroke={1.5} />
								</Group>
							</UnstyledButton>
						</Menu.Target>
						<Menu.Dropdown>
							{/* <Menu.Item
									onClick={() => navigate('/watchlist')}
									icon={<IconHeart size="0.9rem" stroke={1.5} color={theme.colors.red[6]} />}
								>
									Watch List
								</Menu.Item> */}
							<Menu.Item
								color='grey'
								onClick={() => navigate('/all')}
								icon={<IconClipboardList size="0.9rem" stroke={1.5} color={theme.colors.blue[6]} />}
							>
								All Notes
							</Menu.Item>

							<Menu.Item
								color='red'
								onClick={() => navigate('/trash')}
								icon={<IconTrashFilled size="0.9rem" stroke={1.5} color={theme.colors.blue[6]} />}
							>
								Bin
							</Menu.Item>
							{/* <Menu.Item
									disabled
									icon={<IconMessage size="0.9rem" stroke={1.5} color={theme.colors.blue[6]} />}
								>
									Your Reviews
								</Menu.Item> */}

							<Menu.Label>Settings</Menu.Label>
							<Menu.Item onClick={logout} icon={<IconLogout size="0.9rem" stroke={1.5} />}>Logout</Menu.Item>

							{/* <Menu.Item disabled icon={<IconSettings size="0.9rem" stroke={1.5} />}>
									Account settings
								</Menu.Item> */}


							<Menu.Divider />
						</Menu.Dropdown>
					</Menu> : <Button onClick={() => navigate('/auth/login')}>Login</Button>}
				</Group>
			</Container>

		</div>
	);
};

export default XHeader;


const useStyles = createStyles((theme) => ({
	header: {
		// paddingTop: theme.spacing.sm,
		backgroundColor: theme.colors.gray[1],
		borderBottom: theme.colors.yellow,
		position: "fixed",
		top: 0,
		width: "100%",
		zIndex: 1,
	},

	mainSection: {
		// paddingBottom: theme.spacing.sm,
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

	burger_sp: {
		[theme.fn.largerThan('xs')]: {
			display: 'none',
		},
	},
	burger_pc: {
		[theme.fn.smallerThan('xs')]: {
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