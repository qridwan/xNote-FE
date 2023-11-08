import {
	TextInput,
	PasswordInput,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Group,
	Button,
} from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from '../redux/features/auth/authApi';
import { ILoginBody } from '../types/user';
import { IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

export default function Login() {
	const navigate = useNavigate();
	const [login, { isLoading }] = useLoginMutation();

	const form = useForm({
		initialValues: {
			email: '',
			password: ''
		},
		validate: {
			email: isEmail('Invalid email'),
			password: hasLength({ min: 5, max: 10 }, 'Password must be at least 5-10 characters long'),
		},
	});

	return (

		<Container size={420} my={20}>
			<Title
				order={4}
				fw={8}
			>
				Welcome back!
			</Title>
			<Text c="dimmed" size="sm" mt={5}>
				Do not have an account yet?{' '}
				<Link to="/auth/signup">
					<Anchor size="sm" component="button">
						Create account
					</Anchor></Link>
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<form onSubmit={form.onSubmit(async (values: ILoginBody): Promise<void> => {
					const res: any = await login(values);
					notifications.show({
						id: 'success-login',
						withCloseButton: true,
						onClose: () => console.log('unmounted'),
						onOpen: () => console.log('mounted'),
						autoClose: 3000,
						title: res?.data.status === 'Success' ? "Login Success" : "Login Failure",
						message: res?.data.status === 'Success' ? res?.data.message : res?.error?.data.message,
						color: res?.data.status === 'Success' ? 'cyan' : 'red',
						icon: <IconX />,
						className: 'my-notification-class',
						style: { backgroundColor: 'white' },
						loading: false,
					});
					res?.data.status === 'Success' && navigate('/')
				})}>

					<TextInput label="Email" placeholder="mail@qridwan.com" required {...form.getInputProps('email')} />
					<PasswordInput label="Password" placeholder="Your password" required mt="md"  {...form.getInputProps('password')} />
					<Group p="apart" mt="lg">
						<Anchor component="button" size="sm" >
							Forgot password?
						</Anchor>
					</Group>
					<Button disabled={isLoading} fullWidth mt="xl" color='grey' type='submit' >
						Sign in
					</Button>
				</form>
			</Paper>
		</Container>
	);
}