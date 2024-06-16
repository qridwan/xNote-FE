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
import { IconError404 } from '@tabler/icons-react';
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

		<Container size={420} my={20}
		>
			<Title
				align="center"
				sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily!}`, fontWeight: 900 })}
			>
				Welcome Back 👋🏼
			</Title>
			<Text c="dimmed" size="sm" align='center' mt={5}>
				Do not have an account yet?{' '}
				<Link to="/auth/signup">
					<Anchor size="sm" component="button">
						Create account
					</Anchor></Link>
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<form onSubmit={form.onSubmit(async (values: ILoginBody): Promise<void> => {
					const res: any = await login(values);
					const isSuccess = Boolean(res?.data?.status === 'Success');
					// const icon = isSuccess ? <IconCheck /> : <IconX color="red" />;


					if (res?.error) {
						notifications.show({
							title: "Login Failed!",
							message: res.error.data.errorMessage ?? res.error.data.message,
							icon: <IconError404 />,
						})
					} else {

						// notify(isSuccess, "Login Success!", icon);
						isSuccess && navigate('/all')
					}
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