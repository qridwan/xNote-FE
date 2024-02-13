import { Box, Container, Grid, ScrollArea, Tabs, Text } from '@mantine/core';
import { useState } from 'react';
import NoteAddForm from '../components/Note/NoteAddPreview';
import { IconEye, IconNotes } from '@tabler/icons-react';

const CreateNote = () => {
	const [content, setContent] = useState<string>('');

	return (
		<Container size="lg" px="xs" mih={'70vh'} sx={{ sm: { padding: 0 } }}>
			<Tabs defaultValue="text">
				<Tabs.List>
					<Tabs.Tab value="text" icon={<IconNotes size="0.8rem" />}>Text</Tabs.Tab>
					<Tabs.Tab value="preview" icon={<IconEye size="0.8rem" />}>Preview</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value="text" pt="xs">
					<>
						<NoteAddForm content={content} setContent={setContent} />
					</>
				</Tabs.Panel>

				<Tabs.Panel value="preview" pt="xs">
					<ScrollArea h={'75vh'} type="never" >
						<Text fz="xl" color='grey' align='center' fw={700} my={10}>
							Preview Note
						</Text>


						<Box sx={{ border: '1px dashed grey', padding: '6px', borderRadius: '4px', minHeight: '60vh' }}>

							<div dangerouslySetInnerHTML={{ __html: content }} style={{ marginBottom: '30px' }}></div>
						</Box>
					</ScrollArea>
				</Tabs.Panel>
			</Tabs>

		</Container >
	);
};

export default CreateNote;