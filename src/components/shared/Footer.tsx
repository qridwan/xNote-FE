import { createStyles, Anchor, Group, ActionIcon, rem, Container } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import BrandLogo from '../../atoms/BrandLogo';
import { Link } from 'react-router-dom';





const useStyles = createStyles((theme) => ({
	footer: {
		marginTop: rem(120),
		borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
			}`,
	},

	inner: {
		display: 'flex',
		justifyContent: 'space-between',
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
		<Container size={'lg'}>
			<div className={classes.footer}>
				<div className={classes.inner}>
					<BrandLogo />

					<Group className={classes.links}>{items}</Group>

					<Group spacing="xs" position="right" noWrap>
						<ActionIcon size="lg" variant="default" radius="xl">
							<IconBrandTwitter size="1.05rem" stroke={1.5} />
						</ActionIcon>
						<ActionIcon size="lg" variant="default" radius="xl">
							<IconBrandYoutube size="1.05rem" stroke={1.5} />
						</ActionIcon>
						<ActionIcon size="lg" variant="default" radius="xl">
							<IconBrandInstagram size="1.05rem" stroke={1.5} />
						</ActionIcon>
					</Group>
				</div>
			</div>
		</Container>
	);
}

const links = [
	{
		"link": "/",
		"label": "Featured"
	},
	{
		"link": "/all",
		"label": "All Notes"
	}
]
