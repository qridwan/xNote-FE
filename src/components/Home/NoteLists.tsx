import { Grid, Text } from '@mantine/core';
import { noteType } from '../../types/note';
import BoiLoader from '../../atoms/Loader';
import { SingleNote } from './SingleNote';

const NoteLists = ({ type, notes, isLoading }: { type: string, notes: noteType[] | any, isLoading: boolean }) => {

	return (
		<Grid justify='center' align='stretch'>
			{
				isLoading ? <BoiLoader /> : notes?.length > 0 ? notes.map((note: any) => <Grid.Col key={note.id} sm={6} md={4} lg={type == 'all' ? 6 : 3} >
					<SingleNote note={note} />
				</Grid.Col>) : <Text>No notes Found!</Text>
			}
		</Grid>
	);
};

export default NoteLists;