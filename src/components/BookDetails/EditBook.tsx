// import { useForm } from '@mantine/form';
// import {
// 	TextInput,
// 	Paper,
// 	Text,
// 	Container,
// 	Button
// } from '@mantine/core';
// import { DateInput } from '@mantine/dates';
// import { useAppSelector } from '../../redux/hook';
// import { useEditbookMutation } from '../../redux/features/books/bookApi';
// // import { bookType } from '../../types/note';
// import { notifications } from '@mantine/notifications';
// import { IconX } from '@tabler/icons-react';
// import { formateDate } from '../../helpers/dates';

// const Editbook = ({ book, close }: { book: bookType, close: any }) => {
// 	const [editbook, { isLoading }] = useEditbookMutation();

// 	// const [files, setFiles] = useState<FileWithPath[]>([]);
// 	const { user } = useAppSelector(state => state.auth)

// 	// const previews = files.map((file, index) => {
// 	// 	const imageUrl = URL.createObjectURL(file);
// 	// 	return (
// 	// 		<Image
// 	// 			key={index}
// 	// 			src={imageUrl}
// 	// 			imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
// 	// 		/>
// 	// 	);
// 	// });
// 	const form = useForm({
// 		initialValues: {
// 			title: book.title,
// 			genre: book.genre,
// 			// publication: convertIso(book.publication),
// 			author: book.author,
// 			addedBy: user?.id,
// 		}
// 	});
// 	return (
// 		<div>
// 			<Container my={20} sx={{ height: 450, display: 'flex', alignItems: 'center' }} >


// 				<Paper withBorder shadow="md" p={10} mt={10} radius="md" sx={{ width: '100%' }}>
// 					<form onSubmit={form.onSubmit(async (values): Promise<void> => {
// 						const res: any = await editbook({
// 							data: { ...values, publication: formateDate(values.publication) } as bookType, id: book?.id as string
// 						});

// 						notifications.show({
// 							id: 'success-login',
// 							withCloseButton: true,
// 							onClose: () => console.log('unmounted'),
// 							onOpen: () => console.log('mounted'),
// 							autoClose: 3000,
// 							title: res?.data.status === 'Success' ? "book Updated" : "Operation Failed",
// 							message: res?.data.status === 'Success' ? res.data?.message : res?.error?.data.message,
// 							color: res?.data.status === 'Success' ? 'cyan' : 'red',
// 							icon: <IconX />,
// 							className: 'my-notification-class',
// 							style: { backgroundColor: '' },
// 							sx: { backgroundColor: 'white' },
// 							loading: false,
// 						});


// 						res?.data.status === 'Success' && close();

// 						return Promise.resolve();
// 					})}>

// 						<Text align='center'>EDIT book</Text>
// 						<TextInput label="book Name/ Title" placeholder="Think and Grow Rich"  {...form.getInputProps('title')} />
// 						<TextInput label="Author name" placeholder=""  {...form.getInputProps('author')} />
// 						<TextInput label="Genre" placeholder=" Horror/Romantic"  {...form.getInputProps('genre')} />
// 						{/* <TextInput label="Publication" placeholder="" required {...form.getInputProps('publication')} /> */}
// 						<DateInput
// 							label="Publication Date"
// 							placeholder=""
// 							valueFormat="DD-MM-YYYY"
// 							maxDate={new Date()}
// 							{...form.getInputProps('publication')}
// 						/>
// 						{/* <Box my={10}>
// 							<Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles}>
// 								<Text align="center">Drop the book image</Text>
// 							</Dropzone>

// 							<SimpleGrid
// 								cols={4}
// 								breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
// 								mt={previews.length > 0 ? 'xl' : 0}
// 							>
// 								{previews}
// 							</SimpleGrid>
// 						</Box> */}

// 						<Button disabled={isLoading} fullWidth gradient={{ from: 'indigo', to: 'cyan' }} mt="xl" color='cyan' type='submit' >
// 							{!isLoading ? 'Update' : 'Updating...'}
// 						</Button>
// 					</form>
// 				</Paper>
// 			</Container>
// 		</div >
// 	);
// };

// export default Editbook;


// const convertIso = (val: string) => {
// 	const formattedDate = val; // Example formatted date string
// 	let [day, month, year] = formattedDate.split('/');
// 	if (!day && !month && !year) {
// 		[day, month, year] = formattedDate.split('-');
// 	}
// 	const revertedDate = new Date(`${year}-${month}-${day}`);

// 	return revertedDate;
// }