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
	Grid,
} from '@mantine/core';
import { noteType } from '../../types/note';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useCallback, useState } from 'react';
import { useAddnoteMutation } from '../../redux/features/notes/noteApi';
import notify from '../../utils/notify';
import { useNavigate } from 'react-router-dom';
import { useGetnotebookQuery } from '../../redux/features/notebook/notebookApi';
import { notebookType } from '../../types/notebook';
import { convertSchema } from '../../utils/convertSchema';
import NoteTiptap from './NoteTiptap';
import { debounce } from '../../utils/debounce';
import { getTitleFromContent } from '../../utils/getTitleFromContent';

const NoteAddForm = ({ content, setContent, readonly }: { content: string, setContent: (s: string) => void, readonly?: boolean }) => {
	const [addnote, { isLoading }] = useAddnoteMutation();
	const [tags, setTags] = useState<string[]>([]);
	const navigate = useNavigate();
	const { data: allNoteBooks } = useGetnotebookQuery({}, { refetchOnMountOrArgChange: true, });
	const [isHideOderInput] = useState<boolean>(false);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onValueChange = useCallback(
		debounce((value: string) => {
			setContent(value);

			const noteData = {
				color: form.values.color ? form.values.color : '#C5D899',
				title: getTitleFromContent(value),
				content: value,
				notebook_id: form.values?.notebook_id ? Number(form.values?.notebook_id) : allNoteBooks?.data[0]?.id.toString(),
				category_id: form.values.category_id ? Number(form.values?.category_id) : null
			}
			form.setFieldValue('title', getTitleFromContent(value) ?? 'N/A')
			localStorage.setItem('_noteContent_', JSON.stringify(noteData))
		}, 300),
		[],
	)

	const form = useForm({
		initialValues: {
			title: '',
			content: content,
			notebook_id: allNoteBooks?.data[0]?.id.toString(),
			category_id: null,
			color: '',
		}
	});

	return (
		<div>
			<Paper sx={{ width: '100%' }} shadow="md" p={10} mt={10} radius="md">
				<form


					onSubmit={form.onSubmit(async (values): Promise<void> => {
						console.log('values: ', values);
						const noteData = {
							...values,
							color: values.color ? values.color : '#C5D899',
							title: getTitleFromContent(content),
							content: content,
							notebook_id: values?.notebook_id ? Number(values?.notebook_id) : allNoteBooks?.data[0]?.id.toString(),
							category_id: values.category_id ? Number(values?.category_id) : null,
						}
						const res: any = await addnote(noteData as noteType);
						const isSuccess = Boolean(res?.data?.status === 'Success');
						const icon = isSuccess ? <IconCheck /> : <IconX color="red" />;
						notify(isSuccess, "New note successfully added!", icon);

						if (res?.data.status === 'Success') {
							form.reset();
							setContent('');
							localStorage.removeItem('_noteContent_');
							navigate('/all')
						}
					})}>

					{!readonly && <Box>
						<Text color='grey' align='center' fw={800}>ADD NEW NOTE</Text>

						<Grid>
							<Grid.Col span={isHideOderInput ? 12 : 5}>
								<TextInput
									label="Title"
									placeholder="Title here..."
									required
									{...form.getInputProps('title')}
								/>
							</Grid.Col>
							{!isHideOderInput && <>
								<Grid.Col span={2}>
									<NativeSelect
										label="Choose Notebook"

										data={convertSchema.NotebookConvertedSchema(allNoteBooks?.data as notebookType[])}
										{...form.getInputProps('notebook_id')}
									/>
								</Grid.Col>
								<Grid.Col span={2}>
									<ColorInput label="Set note color" {...form.getInputProps('color')} swatches={['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']} defaultValue="#C5D899" />
								</Grid.Col>
								<Grid.Col span={2}>
									<MultiSelect
										label="Add Tags (Optional)"
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
								</Grid.Col>
							</>}
						</Grid>
						{/* <Text color='dark' align='start' fz={14} fw={500}>Description *</Text> */}
						{/* <Editor
							handleChangeEditor={handleChangeEditor}
							content={content}
						/> */}
					</Box>
					}

					<NoteTiptap readonly={readonly} onValueChange={onValueChange} content={content} />

					<Button disabled={isLoading} fullWidth gradient={{ from: 'indigo', to: 'cyan' }} mt="xl" color='grey' type='submit' >
						{!isLoading ? 'SAVE' : 'SAVING...'}
					</Button>
				</form>
			</Paper>
		</div >
	);
};

export default NoteAddForm;


