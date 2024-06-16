import { Box, Container, Grid, Text } from '@mantine/core';
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
					{/* <ScrollArea h={'75vh'} w={"100%"} type="never" > */}
					<Box display={'block'}>
						<Text fz={{ md: 30, xs: 18 }} align='center' color='grey' fw={800} my={{ md: 30, sm: 14 }} inline>
							All Notes
						</Text>
						<NoteLists type={'list'} notes={allnotes?.data} isLoading={isLoading} />
					</Box>
					{/* </ScrollArea> */}
				</Grid.Col>
			</Grid >
		</Container >
	);
};

export default AllNotes;