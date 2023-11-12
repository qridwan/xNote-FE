import { createStyles, Anchor, Group, rem } from '@mantine/core';
import BrandLogo from '../../atoms/BrandLogo';
import { Link } from 'react-router-dom';
import Social from './Social';





const useStyles = createStyles((theme) => ({
	footer: {
		// marginTop: rem(120),
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
		borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
			}`,
	},

	inner: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		padding: `${theme.spacing.md} ${theme.spacing.md}`,
		[theme.fn.smallerThan('sm')]: {
			flexDirection: 'column',
		},
	},

	links: {
		[theme.fn.smallerThan('sm')]: {
			marginTop: theme.spacing.lg,
			marginBottom: theme.spacing.sm,
		},
	},
}));



export default function Footer() {
	const { classes } = useStyles();
	const items = links.map((link) => (
		<Link to={link.link} key={link.label}><Anchor<'div'>
			color="dimmed"
			key={link.label}
			sx={{ lineHeight: 1 }}
			size="sm"
		>
			{link.label}
		</Anchor>
		</Link>
	));

	return (
		<>
			<div className={classes.footer}>
				<div className={classes.inner}>
					<BrandLogo />

					<Group className={classes.links}>{items}</Group>
					<Social />
				</div>
			</div>
		</>
	);
}

const links = [
	{
		"link": "/create",
		"label": "Create Note"
	},
	{
		"link": "/all",
		"label": "All Notes"
	}
]
