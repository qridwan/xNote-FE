
import { RouterProvider } from 'react-router-dom'
import './App.css'
import routes from './routes/routes'
import useAuthCheck from './hooks/useAuthCheck';
import BoiLoader from './atoms/Loader';

function App() {
	const authChecked = useAuthCheck();
	return (
		<>
			{!authChecked ? (
				<BoiLoader />
			) : <RouterProvider router={routes} />}
		</>
	)
}

export default App
