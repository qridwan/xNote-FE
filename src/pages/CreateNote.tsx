import { Box, Container, Tabs, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import NoteAddForm from '../components/Note/NoteAddPreview';
import { IconEye, IconNotes } from '@tabler/icons-react';
import { noteType } from '../types/note';

const DEFAULT = `
<h1 style="text-align: center">An Unforgettable Journey to the Swiss Alps</h1> <p>Last summer, I embarked on an incredible journey through the Swiss Alps, experiencing breathtaking views, exhilarating hikes, and the tranquility of nature. Here's a recap of my adventure and why it remains one of my favorite trips ever.</p> <div style="text-align: center;" class="image"> <img height="auto" src="https://picsum.photos/1920/1080.webp?t=2" align="center" width="500" alt="Swiss Alps"> </div> <hr> <h2>Highlights of the Trip</h2> <ul> <li><p>**Scenic Train Ride:** The Glacier Express from Zermatt to St. Moritz offered panoramic views of snow-capped mountains and lush valleys.</p></li> <li><p>**Hiking Trails:** From the picturesque Lake Oeschinen to the rugged paths of the Matterhorn, each trail brought new discoveries.</p></li> <li><p>**Swiss Culture:** Immersed in Swiss traditions, I enjoyed local cheeses, fondue, and explored charming alpine villages.</p></li> </ul> <h2>Memorable Moments</h2> <p>👉 <a target="_blank" rel="noopener noreferrer nofollow" class="link" href="https://www.myswitzerland.com/en/">Plan Your Swiss Adventure</a></p> <ul> <li><p>Watching the sunset over the peaks while sipping hot chocolate in a mountain cabin.</p></li> <li><p>Encountering wildlife like marmots and ibex during my morning hikes.</p></li> <li><p>Reaching the top of the Gornergrat Railway and witnessing the majestic view of the Matterhorn in all its glory.</p></li> </ul> <h2>Packing Tips</h2> <pre><code class="language-bash">Essentials: Hiking boots, layers, camera, power bank, and Swiss chocolates!</code></pre>`


const CreateNote = () => {
	const [content, setContent] = useState<string>('');
	useEffect(() => {
		// Load note from localStorage on initial render
		const storedNote = localStorage.getItem('_noteContent_');

		if (storedNote) {
			const note: noteType = JSON.parse(storedNote);
			setContent(note.content);
		} else {
			setContent(DEFAULT); // Set default note content if none exists in localStorage
		}
	}, []);

	return (
		<Container size="lg" px="xs" mih={'70vh'} sx={{ sm: { padding: 0 } }}>
			<Tabs defaultValue="text">
				<Tabs.List>
					<Tabs.Tab value="text" icon={<IconNotes size="0.8rem" />}>Text</Tabs.Tab>
					<Tabs.Tab value="preview" icon={<IconEye size="0.8rem" />}>Preview</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value="text" pt="xs">
					<>
						{content && <NoteAddForm content={content} setContent={setContent} />}
					</>
				</Tabs.Panel>

				<Tabs.Panel value="preview" pt="xs">
					<Text fz="xl" color='grey' align='center' fw={700} my={10}>
						Preview Note
					</Text>

					<Box sx={{ border: 'none', padding: '6px', borderRadius: '4px', minHeight: '60vh' }}>
						{content && <NoteAddForm content={content} readonly setContent={setContent} />}
					</Box>
				</Tabs.Panel>
			</Tabs>

		</Container >
	);
};

export default CreateNote;

