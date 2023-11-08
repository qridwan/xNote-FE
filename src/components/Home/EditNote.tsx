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
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { useAddnoteMutation, useEditnoteMutation } from '../../redux/features/notes/noteApi';
import Editor from '../../atoms/Editor';
import isColorLight from '../../utils/isColorLight';

const EditNote = ({ note, close }: { note: noteType, close?: () => void }) => {
	console.log('note: ', note);
	const [editnote, { isLoading }] = useEditnoteMutation();
	const [tags, setTags] = useState<string[]>([]);
	const [content, setContent] = useState<string>(note.content);

	const handleChangeEditor = ({ editor }: any) => {
		setContent(editor?.getHTML() as string);
	};

	const form = useForm({
		initialValues: {
			title: note.title,
			content: content,
			notebook_id: note?.notebook_id ?? null,
			category_id: note?.category_id ?? null,
			color: note?.color ?? '',
			id: note?.id,
		},
	});
	return (
		<div>
			<Container my={0} sx={{ minHeight: 450, display: 'flex', alignItems: 'center' }} >


				<Paper withBorder sx={{ width: '100%' }} shadow="md" p={10} mt={10} radius="md">
					<form onSubmit={form.onSubmit(async (values): Promise<void> => {


						const res: any = await editnote({
							...values,
							content: content,
							notebook_id: values?.notebook_id ? Number(values?.notebook_id) : null,
							category_id: values.category_id ? Number(values?.category_id) : null,
						} as noteType);
						notifications.show({
							id: 'success-login',
							withCloseButton: true,
							onClose: () => console.log('unmounted'),
							onOpen: () => console.log('mounted'),
							autoClose: 3000,
							title: res?.data.status === 'Success' ? "New book Added" : "Operation Failed",
							message: res?.data.status === 'Success' ? res.data?.message : res?.error?.data.message,
							color: res?.data.status === 'Success' ? 'cyan' : 'red',
							icon: <IconX />,
							className: 'my-notification-class',
							style: { backgroundColor: '' },
							loading: false,
						});


						if (res?.data.status === 'Success') {
							form.reset();
							close && close();
							setContent('')
						}
					})}>

						<Text bg={note.color} py={4} color={isColorLight(note?.color) ? 'grey' : 'white'} align='center' fw={800}>Edit NOTE</Text>
						<TextInput label="Title" placeholder="Think and Grow Rich" required {...form.getInputProps('title')} />

						<Box >
							<Text color='dark' align='start' fz={14} fw={500}>Description *</Text>
							<Editor
								handleChangeEditor={handleChangeEditor}
								content={content}
							/>
						</Box>

						<NativeSelect
							label="Choose Category"
							data={[
								{ label: 'React', value: '2' },
								{ label: 'Angular', value: '1' },
								{ label: 'Svelte', value: '23' },
								{ label: 'Vue', value: '4' }
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
							{!isLoading ? 'Update' : 'loading...'}
						</Button>
					</form>
				</Paper>
			</Container>
		</div >
	);
};

export default EditNote;


