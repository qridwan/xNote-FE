import { Button, Grid, Text } from '@mantine/core';
import { noteType } from '../../types/note';
import BoiLoader from '../../atoms/Loader';
import { SingleNote } from './SingleNote';
import React, { useEffect } from 'react';
import CreateNote from '../../pages/CreateNote';
import { IconSquarePlus, IconX } from '@tabler/icons-react';

const NoteLists = ({ type, notes, isLoading }: { type: string, notes: noteType[] | any, isLoading: boolean }) => {
	const [isAddNoteOpen, setIsAddNoteOpen] = React.useState<boolean>(false);

	useEffect(() => {
		isLoading && setIsAddNoteOpen(false);
	}, [isLoading]);
	const buttonVariant = isAddNoteOpen ? "light" : "white";
	const buttonIcon = isAddNoteOpen ? <IconX /> : <IconSquarePlus />;
	const buttonText = isAddNoteOpen ? "Discard" : "Create Note";
	const addNote = <Grid.Col span={12}>
		<Button variant={buttonVariant} leftIcon={buttonIcon} size='lg' onClick={() => setIsAddNoteOpen(!isAddNoteOpen)} color="gray" fullWidth>{buttonText}</Button>
		{
			isAddNoteOpen && <CreateNote />
		}
	</Grid.Col>

	return (
		<Grid justify='center' align='stretch'>

			{
				isLoading ? <BoiLoader /> : notes?.length > 0 ? <>
					{addNote}
					{notes.map((note: any) => <Grid.Col key={note.id} sm={6} md={4} lg={type == 'all' ? 6 : 3} >
						<SingleNote note={note} />
					</Grid.Col>)}
				</> : <>
					{addNote}
					<Text>No notes Found!</Text>
				</>
			}
		</Grid>
	);
};

export default NoteLists;