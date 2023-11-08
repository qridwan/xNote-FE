import { Grid, Text } from '@mantine/core';
import { noteType } from '../../types/note';
import BoiLoader from '../../atoms/Loader';
import { SingleNote } from './SingleNote';
import { SinglenoteList } from '../List/SingleNoteList';

const NoteLists = ({ type, notes, isLoading }: { type: string, notes: noteType[] | any, isLoading: boolean }) => {


	return (

		<Grid justify='center'>
			{
				isLoading ? <BoiLoader /> : notes?.length > 0 ? notes.map((note: any) => <Grid.Col key={note.id} span={type == 'all' ? 6 : 3}>
					{type !== "list" ? <SingleNote note={note} /> : <SinglenoteList note={note} />}
				</Grid.Col>) : <Text>No notes Found!</Text>
			}
		</Grid>

	);
};

export default NoteLists;