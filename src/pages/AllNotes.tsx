import { ActionIcon, Button, Container, Grid, Loader, Modal, ScrollArea, Text, Tooltip, useMantineTheme } from '@mantine/core';
import { SearchArea } from '../components/Home/SearchArea';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { IconArrowRight } from '@tabler/icons-react';
import { useAppSelector } from '../redux/hook';
import { useGetnotesQuery } from '../redux/features/notes/noteApi';
import AddNote from '../components/Home/AddNote';
import NoteLists from '../components/Home/NoteLists';

const AllNotes = () => {

	const [value, setValue] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	// const [yearValue, setYearValue] = useState<Date | null>(null);
	// const [genreValue, setGenreValue] = useState<string>('');
	const { data: allnotes, isLoading } = useGetnotesQuery({ searchTerm: searchTerm }, { refetchOnMountOrArgChange: true, })
	const theme = useMantineTheme();
	const { user } = useAppSelector(state => state.auth)

	return (
		<Container size="lg" px="xs" mih={'70vh'}>
			<Grid>



				{/* MAIN PART */}
				<Grid.Col span={7}>
					<Grid align='end' justify='center' my={10} >
						<Grid.Col span={8}>
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
						</Grid.Col>
						<Grid.Col span={4}>

						</Grid.Col>
					</Grid>
					<ScrollArea h={'70vh'} type="never" >
						<Text fz="xl" fw={700} my={30} inline>
							All Notes
						</Text>
						<NoteLists type={'all'} notes={allnotes?.data} isLoading={isLoading} />
					</ScrollArea>
				</Grid.Col>
				{/* SIDEBAR */}
				<Grid.Col span={5} mt={50} sx={{ overflowY: 'auto' }}>
					{/* <Blockquote cite="– Forrest Gump">
						Life is like an npm install – you never know what you are going to get.
					</Blockquote> */}
					{user?.username && <Grid.Col span={12}>
						<AddNote />
					</Grid.Col>}

				</Grid.Col>
			</Grid >
		</Container >
	);
};

export default AllNotes;