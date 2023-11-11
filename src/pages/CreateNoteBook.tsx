import { Container, Grid } from '@mantine/core';
import { useAppSelector } from '../redux/hook';
import NotebookForm from '../components/NoteBook/AddNoteBookForm';

const CreateNoteBook = () => {
	const { user } = useAppSelector(state => state.auth)

	return (
		<Container size="lg" px="xs" mih={'70vh'} >
			<Grid justify='center'>

				{/* editor */}
				<Grid.Col span={8} mt={10} sx={{ overflowY: 'auto' }}>
					{user?.username && <Grid.Col span={12}>
						<NotebookForm />
						{/* <NoteAddForm content={content} setContent={setContent} /> */}
					</Grid.Col>}

				</Grid.Col>




			</Grid >
		</Container >
	);
};

export default CreateNoteBook;