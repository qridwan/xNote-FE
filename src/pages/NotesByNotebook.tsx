import { Container, Grid, ScrollArea, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useGetnotesbyfolderQuery } from '../redux/features/notes/noteApi';
import NoteLists from '../components/Home/NoteLists';
import { useParams } from 'react-router-dom';

const NotesByNotebook = () => {
	const [searchTerm] = useState<string>('');
	const { id } = useParams<{ id: string }>() || {};
	const { data: allnotes, isLoading, isFetching } = useGetnotesbyfolderQuery({ searchTerm: searchTerm, id: id ?? '' }, { refetchOnMountOrArgChange: true });

	return (
		<Container size="lg" px="xs" mih={'70vh'}>
			<Grid>
				{/* MAIN PART */}
				<Grid.Col span={12}>

					<Text fz={30} align='center' color='grey' fw={800} my={30} inline>
						{
							allnotes?.data[0]?.notebook_name
						}
					</Text>
					<NoteLists type={'list'} notes={allnotes?.data} isLoading={(isLoading || isFetching)} />

				</Grid.Col>

			</Grid >
		</Container >
	);
};

export default NotesByNotebook;