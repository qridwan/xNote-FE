import { ActionIcon, Group, Tooltip, createStyles, rem } from '@mantine/core';
import { IconBrandDiscord, IconBrandGithub, IconBrandLinkedin, IconMessage } from '@tabler/icons-react';

const Social = () => {
	const { classes } = useStyles();
	return (
		<Group spacing={0} className={classes.social} position="right" noWrap>
			<Tooltip label="qridwan" color='cyan' withArrow>
				<ActionIcon size="lg" onClick={() => window.open('https://discordapp.com/users/qridwan', '_blank')}>
					<IconBrandDiscord size="1.1rem" stroke={1.5} />
				</ActionIcon>
			</Tooltip>
			<Tooltip label="404ridwan@gmail.com" color='red' withArrow>
				<ActionIcon size="lg" onClick={() => window.open('mailto:404ridwan@gmail.com', '_blank')}>
					<IconMessage size="1.1rem" stroke={1.5} />
				</ActionIcon>
			</Tooltip>


			<Tooltip label="qridwan" color='black' withArrow>
				<ActionIcon size="lg" onClick={() => window.open('https://github.com/qridwan', '_blank')}>
					<IconBrandGithub size="1.1rem" stroke={1.5} />
				</ActionIcon>
			</Tooltip>


			<Tooltip label="qridwan" color='blue' withArrow>
				<ActionIcon size="lg" onClick={() => window.open('https://linkedin.com/in/qridwan', '_blank')}>
					<IconBrandLinkedin size="1.1rem" stroke={1.5} />
				</ActionIcon>
			</Tooltip>

		</Group>
	);
};

export default Social;


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