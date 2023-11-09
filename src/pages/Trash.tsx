import { Container, Grid, ScrollArea, Text } from '@mantine/core';

import { useGettrashQuery } from '../redux/features/trash/trashApi';
import TrashLists from '../components/List/TrashList';

const Trash = () => {

	const searchTerm = window.location.search.split('=')[1];
	const { data: allTrash, isLoading } = useGettrashQuery({ searchTerm: searchTerm }, { refetchOnMountOrArgChange: true, })


	// const { user } = useAppSelector(state => state.auth)

	return (
		<Container size="lg" px="xs" mih={'70vh'}>
			<Grid>



				{/* MAIN PART */}
				<Grid.Col span={12}>
					<Grid align='end' justify='center' my={10} >
						<Grid.Col span={8}>

						</Grid.Col>
						<Grid.Col span={4}>

						</Grid.Col>
					</Grid>
					<ScrollArea h={'75vh'} type="never" >
						<Text fz={30} align='center' color='grey' fw={800} my={30} inline>
							Trash Box
						</Text>
						<TrashLists type={'list'} notes={allTrash?.data} isLoading={isLoading} />
					</ScrollArea>
				</Grid.Col>
			</Grid >
		</Container >
	);
};

export default Trash;