import { useForm } from '@mantine/form';
import {
	TextInput,
	Paper,
	Text,
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
import Editor from '../../atoms/Editor';
import notify from '../../utils/notify';
import { useNavigate } from 'react-router-dom';
import { useGetnotebookQuery } from '../../redux/features/notebook/notebookApi';
import { notebookType } from '../../types/notebook';
import { convertSchema } from '../../utils/convertSchema';

const NoteAddForm = ({ content, setContent, }: { content: string, setContent: (s: string) => void }) => {
	const [addnote, { isLoading }] = useAddnoteMutation();
	const [tags, setTags] = useState<string[]>([]);
	const navigate = useNavigate();
	const { data: allNoteBooks } = useGetnotebookQuery({}, { refetchOnMountOrArgChange: true, })

	const handleChangeEditor = ({ editor }: any) => {
		setContent(editor?.getHTML() as string);
	};

	const form = useForm({
		initialValues: {
			title: '',
			content: content,
			notebook_id: allNoteBooks?.data[0]?.id.toString(),
			category_id: null,
			color: '',
		},
	});
	return (
		<div>
			<Paper withBorder sx={{ width: '100%' }} shadow="md" p={10} mt={10} radius="md">
				<form onSubmit={form.onSubmit(async (values): Promise<void> => {
					console.log('values: ', values);
					const res: any = await addnote({
						...values,
						color: values.color ? values.color : '#C5D899',
						content: content,
						notebook_id: values?.notebook_id ? Number(values?.notebook_id) : allNoteBooks?.data[0]?.id.toString(),
						category_id: values.category_id ? Number(values?.category_id) : null,
					} as noteType);
					const isSuccess = Boolean(res?.data?.status === 'Success');
					const icon = isSuccess ? <IconCheck /> : <IconX color="red" />;
					notify(isSuccess, "New note successfully added!", icon);

					if (res?.data.status === 'Success') {
						form.reset();

						setContent('')
						navigate('/all')
					}
				})}>


					<Text color='grey' align='center' fw={800}>ADD NEW NOTE</Text>
					<TextInput label="Title" placeholder="Think and Grow Rich" required {...form.getInputProps('title')} />

					<Box >
						<Text color='dark' align='start' fz={14} fw={500}>Description *</Text>
						<Editor
							handleChangeEditor={handleChangeEditor}
							content={content}
						/>
					</Box>

					<NativeSelect
						label="Choose Notebook"

						data={convertSchema.NotebookConvertedSchema(allNoteBooks?.data as notebookType[])}
						{...form.getInputProps('notebook_id')}
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
						{!isLoading ? 'CREATE' : 'loading...'}
					</Button>
				</form>
			</Paper>
		</div >
	);
};

export default NoteAddForm;




