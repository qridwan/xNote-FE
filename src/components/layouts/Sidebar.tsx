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
} from '@mantine/core';
import { IconBulb, IconPlus, IconTrash, IconArrowRight, IconSquarePlus } from '@tabler/icons-react';
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



export function XSidebar() {
	const navigate = useNavigate();
	const [value, setValue] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const theme = useMantineTheme();
	const { data: allTrash, isLoading } = useGettrashQuery({ searchTerm: searchTerm }, { refetchOnMountOrArgChange: true, })
	const { data: allNotes } = useGetnotesQuery({ searchTerm: searchTerm }, { refetchOnMountOrArgChange: true, })
	const { data: allNoteBooks } = useGetnotebookQuery({}, { refetchOnMountOrArgChange: true, })

	const links = [
		{ icon: IconBulb, label: 'All Notes', color: 'grey', notifications: allNotes?.data.length ?? 0, link: '/all' },
		{ icon: IconSquarePlus, label: 'Create Note', color: 'gray', link: '/create' },
		{ icon: IconTrash, label: 'Trash', color: 'red', notifications: allTrash?.data.length ?? 0, link: '/trash' },

	];



	const mainLinks = links.map((link) => (
		<UnstyledButton onClick={() => navigate(link.link)} key={link.label} className={classes.mainLink}>
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

	const collectionLinks = allNoteBooks?.data.map((notebook: notebookType) => (
		<Link
			to={`/notebook/${notebook.id as string}`}
			key={notebook.id}
			className={classes.collectionLink}
		>
			<span style={{ marginRight: rem(9), fontSize: rem(16) }}>{notebook.icon}</span>{' '}
			{notebook.name}
		</Link>
	));

	return (
		<nav className={classes.navbar}>
			<div className={classes.section}>
				{/* <UserButton /> */}
			</div>
			<SearchArea value={value} onChange={(event) => {
				setValue(event.currentTarget.value)
				if (event.currentTarget.value === '') {
					setSearchTerm('')
				}
			}} rightSection={
				<ActionIcon disabled={isLoading} onClick={() => {

					setSearchTerm(value)
				}} size={32} radius="xl" color={theme.primaryColor} variant="filled">
					{(
						!isLoading ? <IconArrowRight size="1.1rem" stroke={1.5} />
							: <Loader size="xs" color='white' />
					)}
				</ActionIcon>
			} />
			{/* <TextInput
				placeholder="Search"
				size="xs"
				leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
				rightSectionWidth={70}
				rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
				// styles={{ section: { pointerEvents: 'none' } }}
				mb="sm"
			/> */}

			<div className={classes.section}>
				<div className={classes.mainLinks}>{mainLinks}</div>
			</div>

			<div className={classes.section}>
				<Flex className={classes.collectionsHeader} justify="space-between">
					<Text size="lg" fw={500} c="dimmed">
						Folders
					</Text>
					<Tooltip label="Create Folder" withArrow color='grey' position="right">
						<ActionIcon onClick={() => navigate('/create-notebook')} variant="default" size={18}>
							<IconPlus style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
						</ActionIcon>
					</Tooltip>
				</Flex>
				<div className={classes.collections}>{collectionLinks ?? ''}</div>
			</div>
		</nav>
	);
}