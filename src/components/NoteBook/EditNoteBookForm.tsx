import { useForm } from '@mantine/form';
import {
	TextInput,
	Paper,
	Text,
	Container,
	Button,
	Box,
} from '@mantine/core';
import { useState } from 'react';
import EmojiPicker, { Emoji, EmojiClickData } from 'emoji-picker-react';
import { useAddnotebookMutation } from '../../redux/features/notebook/notebookApi';
import { notebookType } from '../../types/notebook';
import notify from '../../utils/notify';
import { IconCheck, IconX } from '@tabler/icons-react';

const EditNotebookForm = ({ existingNb }: { existingNb: notebookType }) => {
	const [addnotebook, { isLoading }] = useAddnotebookMutation();
	const [emoji, setEmoji] = useState<EmojiClickData | null>(null);

	const form = useForm({
		initialValues: {
			name: existingNb.name,
			emoji: existingNb.icon,
		},
	});
	return (
		<div>
			<Container my={0} sx={{ minHeight: 300, display: 'flex', alignItems: 'center' }} >
				<Paper withBorder sx={{ width: '100%' }} shadow="md" p={10} mt={10} radius="md">
					<form onSubmit={form.onSubmit(async (values): Promise<void> => {
						console.log('values: ', values);

						const res: any = await addnotebook({
							name: values.name,
							icon: emoji?.emoji ?? null,
						} as notebookType);

						const isSuccess = Boolean(res?.data?.status === 'Success');
						const icon = isSuccess ? <IconCheck /> : <IconX color="red" />;
						notify(isSuccess, "New note successfully added!", icon);


						// if (res?.data.status === 'Success') {
						// 	form.reset();

						// 	setContent('')
						// 	navigate('/all')
						// }
					})}>

						<Text color='grey' align='center' fw={800}>EDIT NOTEBOOK</Text>
						<TextInput label="Notebook Name" placeholder="Work" required {...form.getInputProps('name')} />

						<Box my={10}>
							<Text align='start' mb={2} fw={500}>Choose a notebook icon</Text>
							<Box sx={{ padding: 4, border: '1px solid grey' }}>
								<Emoji unified={emoji?.unified ?? ''} size={25} />
							</Box>
							<EmojiPicker previewConfig={{
								defaultEmoji: '1f60a',
								showPreview: true,
								defaultCaption: 'Preview',

							}}
								reactionsDefaultOpen={true} width={'100%'} onEmojiClick={(emoji) => {
									// console.log('emoji: ', emoji);
									setEmoji(emoji);
								}} />
						</Box>
						<Button disabled={isLoading} fullWidth gradient={{ from: 'indigo', to: 'cyan' }} mt="xl" color='grey' type='submit' >
							{!isLoading ? 'UPDATE' : 'Updating...'}
						</Button>
					</form>
				</Paper>
			</Container>
		</div >
	);
};

export default EditNotebookForm;
