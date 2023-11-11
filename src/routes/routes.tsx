import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import { NotFound } from '../pages/404';
import AuthLayout from '../layouts/AuthLayout';
import { MainLayout } from '../layouts/MainLayout';
import Home from '../pages/Home';
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
import AllNotes from '../pages/AllNotes';
import Trash from '../pages/Trash';
import CreateNote from '../pages/CreateNote';
import NoteDetails from '../pages/NoteDetails';
import CreateNoteBook from '../pages/CreateNoteBook';
import NotesByNotebook from '../pages/NotesByNotebook';



const routes = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [

			// {
			// 	path: '/watchlist',
			// 	element: <PrivateRoute>
			// 		<WatchList />
			// 	</PrivateRoute>,
			// },
			// {
			// 	path: '/reading',
			// 	element: <PrivateRoute>
			// 		<ReadingList />
			// 	</PrivateRoute>,
			// },
			{
				path: '/note/:id',
				element: <NoteDetails />,
			},
			{
				path: '/notebook/:id',
				element: <NotesByNotebook />,
			},
			{
				path: '/all',
				element: <PrivateRoute>
					<AllNotes />
				</PrivateRoute>,
			},
			{
				path: '/trash',
				element: <PrivateRoute>
					<Trash />
				</PrivateRoute>,
			},
			{
				path: '/create',
				element: <PrivateRoute>
					<CreateNote />
				</PrivateRoute>,
			},
			{
				path: '/create-notebook',
				element: <PrivateRoute>
					<CreateNoteBook />
				</PrivateRoute>,
			},
		],
	},
	{
		path: '/',
		element: <AuthLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				index: true,
				element: <AuthRoute>
					<Login />
				</AuthRoute>,
			},

			{
				path: 'login',
				element: <AuthRoute>
					<Login />
				</AuthRoute>,
			},
			{
				path: 'signup',
				element: <AuthRoute>
					<SignUp />
				</AuthRoute>,
			},
		],
	},

	{
		path: '*',
		element: <NotFound />,
	},
]);

export default routes;
