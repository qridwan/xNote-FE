import { Container, Grid, ScrollArea, Text } from '@mantine/core';
import { useState } from 'react';
import { useGetnotesQuery } from '../redux/features/notes/noteApi';
import NoteLists from '../components/Home/NoteLists';

const AllNotes = () => {
	const [searchTerm] = useState<string>('');
	const { data: allnotes, isLoading } = useGetnotesQuery({ searchTerm: searchTerm }, { refetchOnMountOrArgChange: true, })

	return (
		<Container size="lg" px="xs" mih={'70vh'}>
			<Grid>



				{/* MAIN PART */}
				<Grid.Col span={12}>

					<ScrollArea h={'75vh'} type="never" >
						<Text fz={{ md: 30, xs: 18 }} align='center' color='grey' fw={800} my={{ md: 30, sm: 14 }} inline>
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