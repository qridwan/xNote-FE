import {
	UnstyledButton,
	Badge,
	Text,
	ActionIcon,
	Tooltip,
	rem,
	Flex,
	useMantineTheme,
	Loader,
	Box,
	ScrollArea,
} from '@mantine/core';
import { IconMist, IconPlus, IconTrash, IconArrowRight, IconSquarePlus } from '@tabler/icons-react';
//   import { UserButton } from '../UserButton/UserButton';
import classes from './Sidebar.module.css';
import { SearchArea } from '../Home/SearchArea';
import { useNavigate } from 'react-router-dom';
import { useGettrashQuery } from '../../redux/features/trash/trashApi';
import { useState } from 'react';
import { useGetnotesQuery } from '../../redux/features/notes/noteApi';
import { useGetnotebookQuery } from '../../redux/features/notebook/notebookApi';
import { notebookType } from '../../types/notebook';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hook';

export function XSidebar({ toggle }: { toggle: () => void }) {
	const navigate = useNavigate();
	const [value, setValue] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const theme = useMantineTheme();
	const { settings: { sidebar } } = useAppSelector(state => state.note);
	const { data: allTrash, isLoading } = useGettrashQuery({ searchTerm: searchTerm }, { refetchOnMountOrArgChange: true, })
	const { data: allNotes } = useGetnotesQuery({ searchTerm: searchTerm }, { refetchOnMountOrArgChange: true, })
	const { data: allNoteBooks } = useGetnotebookQuery({}, { refetchOnMountOrArgChange: true, })

	const links = [
		{ icon: IconMist, label: 'All Notes', color: 'grey', notifications: allNotes?.data.length ?? 0, link: '/all' },
		{ icon: IconSquarePlus, label: 'Create Note', color: 'gray', link: '/create' },
		{ icon: IconTrash, label: 'Trash', color: 'red', notifications: allTrash?.data.length ?? 0, link: '/trash' },

	];



	const mainLinks = links.map((link) => (
		<UnstyledButton onClick={() => {
			navigate(link.link)
			toggle();
		}} key={link.label} className={classes.mainLink}>
			<div className={classes.mainLinkInner}>
				<link.icon color={link.color} size={20} className={classes.mainLinkIcon} stroke={1.5} />
				<Text color={link.color}>{link.label}</Text>
			</div>
			{link.notifications && (
				<Badge color={link.color} size="sm" variant="filled" className={classes.mainLinkBadge}>
					{link.notifications}
				</Badge>
			)}
		</UnstyledButton>
	));

	const shortMainLinks = links.map((link) => (
		<UnstyledButton onClick={() => {
			navigate(link.link)
			toggle();
		}} key={link.label} className={classes.mainLink}>
			<div className={classes.shortMainLinkInner}>
				<link.icon color={link.color} size={22} className={classes.shortMainLinkIcon} stroke={1.5} />
			</div>

		</UnstyledButton>
	));

	const collectionLinks = allNoteBooks?.data.map((notebook: notebookType) => (
		<Link
			to={`/notebook/${notebook.id as string}`}
			key={notebook.id}
			className={classes.collectionLink}
			onClick={toggle}
		>
			<span style={{ marginRight: rem(9), fontSize: rem(16) }}>{notebook.icon}</span>{' '}
			{notebook.name}
		</Link>
	));
	const shortCollectionLinks = allNoteBooks?.data.map((notebook: notebookType) => (

		<Tooltip key={notebook.id} style={{ zIndex: '1000 !important' }} label={notebook.name} withArrow color='grey' position="bottom">
			<Link
				to={`/notebook/${notebook.id as string}`}

				className={classes.shortCollectionLink}
				onClick={toggle}
			>
				<span style={{ fontSize: rem(16) }}>{notebook.icon}</span>{' '}

			</Link>
		</Tooltip>
	));

	return (
		<nav className={sidebar == "default" ? classes.navbar : classes.shortNavbar}>
			{sidebar == 'default' && <main>
				<section className={classes.section}>
					{/* <UserButton /> */}
					<SearchArea value={value} onChange={(event) => {
						setValue(event.currentTarget.value)
						if (event.currentTarget.value === '') {
							setSearchTerm('')
						}
					}} rightSection={
						<ActionIcon disabled={isLoading} onClick={() => {

							setSearchTerm(value)
						}} size={22} radius="xl" color={theme.primaryColor} variant="filled">
							{(
								!isLoading ? <IconArrowRight size="1rem" stroke={1.5} />
									: <Loader size="xs" color='white' />
							)}
						</ActionIcon>
					} />
				</section>

				<section className={classes.section}>
					<div className={classes.mainLinks}>{mainLinks}</div>
				</section>

				<section className={classes.section}>
					<Flex className={classes.collectionsHeader} justify="space-between">
						<Text size="lg" fw={500} c="dimmed">
							Folders
						</Text>
						<Tooltip style={{ zIndex: '1000 !important' }} label="Create Folder" withArrow color='grey' position="top">
							<ActionIcon onClick={() => navigate('/create-notebook')} variant="default" size={18}>
								<IconPlus style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
							</ActionIcon>
						</Tooltip>
					</Flex>
					<Box component={ScrollArea} h={"60vh"} className={classes.collections}
					>
						{collectionLinks ?? ''}
					</Box>
				</section>
			</main>}

			{/* FOR SHORT NAVBAR */}
			{
				sidebar == 'short' && <main>

					<section className={classes.shortSection}>
						<div className={classes.shortMainLinks}>{shortMainLinks}</div>
					</section>

					<hr />

					<section className={classes.shortSection}>
						<Flex className={classes.collectionsHeader} justify="space-between">
							<Text size="xs" fw={500} c="dimmed">
								Folders
							</Text>
						</Flex>
						<Box component={ScrollArea} h={"60vh"} className={classes.collections}
						>
							{shortCollectionLinks ?? ''}
						</Box>
					</section>
				</main>
			}
		</nav>
	);
}

