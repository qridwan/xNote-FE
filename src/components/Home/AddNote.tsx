import { useForm } from '@mantine/form';
import {
	TextInput,
	Paper,
	Text,
	Container,
	Button,
	ColorInput,
	NativeSelect,
	MultiSelect,
	Box,
} from '@mantine/core';
import { noteType } from '../../types/note';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { useAddnoteMutation } from '../../redux/features/notes/noteApi';
import notify from '../../utils/notify';

const AddNote = () => {
	const [addnote, { isLoading }] = useAddnoteMutation();
	const [tags, setTags] = useState<string[]>([]);
	const [content, setContent] = useState<string>('');

	// const handleChangeEditor = ({ editor }: any) => {
	// 	setContent(editor?.getHTML() as string);
	// };

	const form = useForm({
		initialValues: {
			title: '',
			content: content,
			notebook_id: null,
			category_id: null,
			color: '',
		},
	});
	return (
		<div>
			<Container my={0} sx={{ minHeight: 450, display: 'flex', alignItems: 'center', padding: 0 }} >


				<Paper withBorder sx={{ width: '100%' }} shadow="md" p={5} mt={10} radius="md">
					<form onSubmit={form.onSubmit(async (values): Promise<void> => {


						const res: any = await addnote({
							...values,
							content: content,
							notebook_id: values?.notebook_id ? Number(values?.notebook_id) : null,
							category_id: values.category_id ? Number(values?.category_id) : null,
						} as noteType);

						const isSuccess = Boolean(res?.data?.status === 'Success');
						const icon = isSuccess ? <IconCheck /> : <IconX color="red" />;
						notify(isSuccess, "New note successfully added!", icon);


						if (res?.data.status === 'Success') {
							form.reset();
							setContent('')
						}
					})}>

						<Text color='grey' align='center' fw={800}>ADD NEW NOTE</Text>
						<TextInput label="Title" placeholder="Think and Grow Rich" required {...form.getInputProps('title')} />
						{/* <Textarea
							label="Description"
							description="Your note description"
							placeholder=""
							autosize
							minRows={3}
							{...form.getInputProps('content')}
						/> */}
						<Box >
							<Text color='dark' align='start' fz={14} fw={500}>Description *</Text>
							{/* <Editor
								handleChangeEditor={handleChangeEditor}
								content={content}
							/> */}
						</Box>

						<NativeSelect
							label="Choose Category"
							data={[
								{ label: 'Finance', value: '2' },
								{ label: 'Study', value: '1' },
								{ label: 'Entertainment', value: '23' },
								{ label: 'Travel', value: '4' }
							]}

							{...form.getInputProps('category_id')}
						/>
						<MultiSelect
							label="Add Tags"
							data={tags}
							placeholder="Choose/Create Tags"
							searchable
							creatable
							{...form.getInputProps('tags')}
							getCreateLabel={(query) => `+ Create ${query}`}
							onCreate={(query) => {
								const item = { value: query, label: query };
								setTags((current: any) => [...current, item]);
								return item;
							}}
						/>
						<ColorInput label="Choose a color" {...form.getInputProps('color')} defaultValue="#C5D899" />

						<Button disabled={isLoading} fullWidth gradient={{ from: 'indigo', to: 'cyan' }} mt="xl" color='grey' type='submit' >
							{!isLoading ? 'SAVE' : 'loading...'}
						</Button>
					</form>
				</Paper>
			</Container>
		</div >
	);
};

export default AddNote;


