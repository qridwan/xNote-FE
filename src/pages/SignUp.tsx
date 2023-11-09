import {
	TextInput,
	PasswordInput,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Button,
} from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { Link } from "react-router-dom";
import { useRegisterMutation } from '../redux/features/auth/authApi';
import { IconX } from '@tabler/icons-react';
import { IconCheck } from '@tabler/icons-react';
import notify from '../utils/notify';

export default function SignUp() {
	const [register, { isLoading }] = useRegisterMutation();

	const form = useForm({
		initialValues: {
			email: '',
			password: '',
			username: '',
		},
		validate: {
			email: isEmail('Invalid email'),
			password: hasLength({ min: 5, max: 10 }, 'Password must be at least 5-10 characters long'),
		},
	});

	return (
		<Container size={420} my={40}>
			<Title
				align="center"
				sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily!}`, fontWeight: 900 })}
			>
				Create New Account
			</Title>
			<Text color="dimmed" size="sm" align="center" mt={5}>
				Already have an account?{' '}
				<Link to="/auth/login">
					<Anchor size="sm" component="button">
						Login
					</Anchor></Link>
			</Text>
			<form onSubmit={form.onSubmit(async (values): Promise<void> => {
				const res: any = await register(values);

				const isSuccess = Boolean(res?.data?.status === 'Success');
				const icon = isSuccess ? <IconCheck /> : <IconX color="red" />;
				notify(isSuccess, "Sign up Success", icon);

			})}>
				<Paper withBorder shadow="md" p={30} mt={30} radius="md">

					<TextInput label="Username" placeholder="Ridwan" required {...form.getInputProps('username')} />
					<TextInput label="Email" mt={10} placeholder="mail@example.com" required {...form.getInputProps('email')} />

					<PasswordInput label="Password" placeholder="Your password" required mt="md"  {...form.getInputProps('password')} />

					<Button disabled={isLoading} fullWidth gradient={{ from: 'indigo', to: 'grey' }} mt="xl" color='grey' type='submit' >
						Submit
					</Button>
				</Paper>
			</form>
		</Container>
	);
}