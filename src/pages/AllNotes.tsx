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
				<Grid.Col span={12}>

					<ScrollArea h={'75vh'} type="never" >
						<Text fz={30} align='center' color='grey' fw={800} my={30} inline>
							All Notes
						</Text>
						<NoteLists type={'list'} notes={allnotes?.data} isLoading={isLoading} />
					</ScrollArea>
				</Grid.Col>

			</Grid >
		</Container >
	);
};

export default AllNotes;