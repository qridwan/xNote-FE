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
	Grid,
} from '@mantine/core';
import { noteType } from '../../types/note';
import { IconX, IconCheck } from '@tabler/icons-react';
import { lazy, Suspense, useCallback, useState } from 'react';
import { useEditnoteMutation } from '../../redux/features/notes/noteApi';
import isColorLight from '../../utils/isColorLight';
import notify from '../../utils/notify';
import { convertSchema } from '../../utils/convertSchema';
import { useGetnotebookQuery } from '../../redux/features/notebook/notebookApi';
import { notebookType } from '../../types/notebook';
const NoteTiptap = lazy(() => import('../Note/NoteTiptap'));

import { debounce } from '../../utils/debounce';

const EditNote = ({ note, close }: { note: noteType, close?: () => void }) => {
	const { data: allNoteBooks } = useGetnotebookQuery({}, { refetchOnMountOrArgChange: true, })
	const [editnote, { isLoading }] = useEditnoteMutation();
	const [tags, setTags] = useState<string[]>([]);
	const [content, setContent] = useState<string>(note.content);
	// const handleChangeEditor = ({ editor }: any) => {
	// 	setContent(editor?.getHTML() as string);
	// };
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

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const onValueChange = useCallback(
		debounce((value: string) => {
			setContent(value)
		}, 300),
		[],
	)

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
						const isSuccess = Boolean(res?.data?.status === 'Success');
						const icon = isSuccess ? <IconCheck /> : <IconX color="red" />;
						notify(isSuccess, "Note successfully updated!", icon);
						if (isSuccess) {
							form.reset();
							close && close();
							setContent('')
						}
					})}>

						<Text bg={note.color} py={4} color={isColorLight(note?.color as string) ? 'grey' : 'white'} align='center' fw={800}>Edit NOTE</Text>
						<TextInput label="Title" placeholder="Think and Grow Rich" required {...form.getInputProps('title')} />
						<Grid>
							<Grid.Col span={4}>
								<NativeSelect
									label="Choose Notebook"

									data={convertSchema.NotebookConvertedSchema(allNoteBooks?.data as notebookType[])}
									{...form.getInputProps('notebook_id')}
								/>
							</Grid.Col>
							<Grid.Col span={4}>
								<ColorInput label="Set note color" {...form.getInputProps('color')} swatches={['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']} defaultValue="#C5D899" />
							</Grid.Col>
							<Grid.Col span={4}>
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
						</Grid>
						<Box >
							<Text color='dark' align='start' fz={14} fw={500}>Description *</Text>
							{/* <Editor
								handleChangeEditor={handleChangeEditor}
								content={content}
							/> */}
							<Suspense fallback={<div>Loading...</div>}>
								<NoteTiptap onValueChange={onValueChange} content={content} />
							</Suspense>
						</Box>

						{/* <NativeSelect
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
						<ColorInput label="Choose a color" {...form.getInputProps('color')} defaultValue="#C5D899" /> */}

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