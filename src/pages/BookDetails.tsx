/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Card,
	Image,
	Text,
	ActionIcon,
	Badge,
	Group,
	Avatar,
	Container,
	Grid,
	Flex,
	Textarea,
	Divider,
	Button,
	Tooltip,
	Dialog,
	Modal,
} from '@mantine/core';
import { IconBookFilled, IconBookmark, IconEdit, IconHeart, IconHeartFilled } from '@tabler/icons-react';
import Review from '../components/BookDetails/Review';
import IReview from '../types/review';
import { hasLength, useForm } from '@mantine/form';
import { useAddReviewMutation, useDeletebookMutation, useGetReviewsQuery, useSinglebookQuery } from '../redux/features/books/bookApi';
import { useNavigate, useParams } from 'react-router-dom';
import { noteType } from '../types/note';
import { useAppSelector } from '../redux/hook';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { useAddReadingListMutation, useAddWishListMutation, useDeleteReadingMutation, useDeleteWishlistMutation, useGetReadingListQuery, useGetWishlistQuery } from '../redux/features/personalList/listApi';
import { useEffect, useState } from 'react';
// import { IconTrashFilled } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
// import Editbook from '../components/BookDetails/EditBook';



const BookDetails = () => {
	const { id: bookId } = useParams();
	const [opened, { toggle, close }] = useDisclosure(false);
	const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
	const { data } = useSinglebookQuery(bookId as string);
	const [isWish, setIsWish] = useState<any>(null);
	const [isReading, setIsReading] = useState<any>(null);
	const { data: allreviews } = useGetReviewsQuery(bookId as string);
	const { user } = useAppSelector(state => state.auth)
	const [addReview, { isLoading }] = useAddReviewMutation();
	const [addWishlist] = useAddWishListMutation();
	const [addReadingList] = useAddReadingListMutation();
	const [deleteWishlist] = useDeleteWishlistMutation();
	const [deleteReading] = useDeleteReadingMutation();
	const [deletebook, { isLoading: isDeleting }] = useDeletebookMutation();
	const navigate = useNavigate();



	const handleDeletebook = async (): Promise<void> => {
		const res: any = await deletebook(bookId as string);
		// console.log('res: ', res);
		notifications.show({
			id: 'success-login',
			withCloseButton: true,
			onClose: () => console.log('unmounted'),
			onOpen: () => console.log('mounted'),
			autoClose: 3000,
			title: res?.status === 'Success' ? "book Deleted" : "Operation Failed",
			message: res?.status === 'Success' ? res.data?.message : res?.error?.data.message,
			color: res?.status === 'Success' ? 'cyan' : 'red',
			icon: <IconX />,
			className: 'my-notification-class',
			loading: false,
		});
		close();// closing dialog
		res?.status === 'Success' && navigate('/');
		return Promise.resolve();
	}

	const { data: allWishlist } = useGetWishlistQuery({});
	const { data: allReadinglist } = useGetReadingListQuery({});

	useEffect(() => {

		const isWishListed = allWishlist?.data.find((item: any) => item.bookId.id === bookId)
		const isReadingListed = allReadinglist?.data.find((item: any) => item.bookId.id === bookId)

		if (isWishListed) {
			setIsWish(isWishListed)
		}
		if (isReadingListed) {
			setIsReading(isReadingListed)
		}
	}, [allWishlist, allReadinglist])
	const form = useForm({
		initialValues: {
			review: '',
		},
		validate: {
			// email: isEmail('Invalid email'),
			review: hasLength({ min: 1, max: 500 }, 'Invalid Review'),
		},
	});
	// props: bookType

	const { content, title, category }: noteType = data?.data || {};

	return (
		<Container size={'md'}>
			<Grid>
				<Grid.Col span={4}>
					<Card.Section style={{ display: "flex", justifyContent: "center" }}>

						<Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrBstXAmkzVK-Ze6Lg_gZMVl57-7Oyvpw6QA&usqp=CAU" height={250} width={200} />

					</Card.Section>
				</Grid.Col>
				<Grid.Col span={8}
				>
					<Flex direction={'row'} align={'center'}>
						<Avatar size={24} radius="xl" mr="xs" color='cyan' >
							{user?.username}
							{/* {author?.split(' ')[0].slice(0, 1) + author?.split(' ')[1]?.slice(0, 1)} */}
						</Avatar>
						<Text fz="lg" inline>
							{user?.username}
						</Text>
						<Badge ml={10} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
							{category}
						</Badge>
					</Flex>
					<Text fw={500} fz="xl" my={20} >
						{title}
						{/* <Text fz="xs"   >
							Published On: {}
							<br />

						</Text> */}
					</Text>


				</Grid.Col>
			</Grid>
			{user?.username && <Group p="right" >
				<Group spacing={8} mr={0} p='right'>

					<ActionIcon onClick={async (): Promise<void> => {
						if (!isWish) {
							const res: any = await addWishlist({ bookId, userId: user?.id });

							res?.data.statusCode === 200 && setIsWish(res?.data?.data)
						} else {
							const res: any = await deleteWishlist(isWish.id as string);
							res?.data.statusCode === 200 && setIsWish(null)
						}
						return Promise.resolve(); // Return a resolved Promise with void
					}}

					>
						<Tooltip label={isWish ? "Remove from wishlist" : "Add to wishlist"}>

							{isWish ? <IconHeartFilled size="1rem" color={'red'} /> : <IconHeart size="1rem" color={'red'} />}
						</Tooltip>
					</ActionIcon>
					<ActionIcon onClick={async (): Promise<void> => {
						if (!isReading) {
							const res: any = await addReadingList({ bookId, userId: user?.id });

							res?.data.statusCode === 200 && setIsReading(res?.data?.data)
						} else {
							const res: any = await deleteReading(isReading.id as string);
							res?.data.statusCode === 200 && setIsReading(null)
						}
						return Promise.resolve(); // Return a resolved Promise with void
					}}>
						<Tooltip label={isReading ? "Remove from currently reading" : "Add to currently reading"}>

							{isReading ? <IconbookFilled size="1rem" color={'yellow'} /> : <Iconbookmark size="1rem" color={'red'} />}
						</Tooltip>
					</ActionIcon>

					{/* {
						(user?.id === addedBy?.id) && <><ActionIcon onClick={async (): Promise<void> => {
							openEdit();
							return Promise.resolve(); // Return a resolved Promise with void
						}}>
							<Tooltip label={"Edit book"}>
								<IconEdit size="1rem" color={theme.colors.blue[6]} />
							</Tooltip>
						</ActionIcon>

							<ActionIcon onClick={async (): Promise<void> => {
								toggle();
								return Promise.resolve(); // Return a resolved Promise with void
							}}>
								<Tooltip label={isReading ? "Remove from currently reading" : "Add to currently reading"}>

									<IconTrashFilled size="1rem" color={theme.colors.red[6]} />
								</Tooltip>
							</ActionIcon>
						</>
					} */}

				</Group>
			</Group>}

			<Container size={'xs'} mb={20}>
				<form onSubmit={form.onSubmit(async (values): Promise<void> => {
					const formData = {

						review: values.review,
						bookId: bookId,
						reviewerId: user?.id
					}

					const res: any = await addReview(formData as {
						review: string;
						bookId: string;
						reviewerId: string;
					});
					notifications.show({
						id: 'success-login',
						withCloseButton: true,
						onClose: () => console.log('unmounted'),
						onOpen: () => console.log('mounted'),
						autoClose: 3000,
						title: res?.status === 'Success' ? "Review Added" : "Operation Failed",
						message: res?.status === 'Success' ? res.data?.message : res?.error?.data.message,
						color: res?.status === 'Success' ? 'cyan' : 'red',
						icon: <IconX />,
						className: 'my-notification-class',
						loading: false,
					});


					res?.status === 'Success' && form.reset();
					return Promise.resolve();


				})}>
					{user?.username && <Grid align='end'>
						<Grid.Col span={10}>

							<Textarea
								required {...form.getInputProps('review')}
								placeholder="Your review"
								label="Add Review"
								withAsterisk
							/>
						</Grid.Col>
						<Grid.Col span={2}>
							<Button disabled={isLoading} type='submit'>
								Save
							</Button>
						</Grid.Col>

						<Divider my={10} />
					</Grid>}
					{
						allreviews?.data?.map((review: IReview) => <Review key={review.id} createdAt={review.createdAt} review={review.review} author={review.reviewerId.fullName} />)
					}

				</form>
			</Container>

			{/* //confirm message for delete book: */}

			<Dialog position={{ top: 20, right: 20 }} opened={opened} withCloseButton onClose={close} size="lg" radius="md">
				<Text size="sm" mb="xs" w={500}>
					Are you sure to delete the book?
				</Text>

				<Group align="flex-end">
					<Button onClick={handleDeletebook} color='red' disabled={isDeleting}>{isDeleting ? 'Deleting...' : 'DELETE'}</Button>
				</Group>
			</Dialog>

			{/* Edit modal */}
			<Modal size="calc(100vw - 60vw)" opened={openedEdit} onClose={closeEdit} title="" centered>
				{/* <Editbook book={data?.data as bookType} close={closeEdit} /> */}
			</Modal>
		</Container>
	);
};

export default BookDetails;


