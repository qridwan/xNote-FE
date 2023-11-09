import { Box, Container, Grid, ScrollArea, Text } from '@mantine/core';
import { useState } from 'react';
import { useAppSelector } from '../redux/hook';
import NoteAddForm from '../components/Note/NoteAddPreview';

const CreateNote = () => {
	const { user } = useAppSelector(state => state.auth)
	const [content, setContent] = useState<string>('');

	return (
		<Container size="lg" px="xs" mih={'70vh'} >
			<Grid>

				{/* editor */}
				<Grid.Col span={6} mt={10} sx={{ overflowY: 'auto' }}>
					{user?.username && <Grid.Col span={12}>
						<NoteAddForm content={content} setContent={setContent} />
					</Grid.Col>}

				</Grid.Col>



				{/* preview note */}
				<Grid.Col span={6}>

					<ScrollArea h={'75vh'} type="never" >
						<Text fz="xl" color='grey' align='center' fw={700} my={10}>
							Preview Note
						</Text>


						<Box sx={{ border: '1px dashed grey', padding: '6px', borderRadius: '4px', minHeight: '60vh' }}>

							<div dangerouslySetInnerHTML={{ __html: content }} style={{ marginBottom: '30px' }}></div>
						</Box>
					</ScrollArea>
				</Grid.Col>
			</Grid >
		</Container >
	);
};

export default CreateNote;