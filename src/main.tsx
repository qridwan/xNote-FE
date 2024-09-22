import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import store from './redux/store';
import { Notifications } from '@mantine/notifications';
import App from './App';
import { MantineProvider, } from '@mantine/core';
import ScrollTop from './components/shared/ScrollTop';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<MantineProvider
			withCSSVariables withGlobalStyles withNormalizeCSS
			theme={{
				primaryColor: 'grey',
				shadows: {
					md: '1px 1px 3px rgba(0, 0, 0, .25)',
					xl: '5px 5px 3px rgba(0, 0, 0, .25)',
				},

				headings: {
					fontFamily: 'Roboto, sans-serif',
					sizes: {
						h1: { fontSize: '2rem' },
					},
				},
				colors: {
					grey: ["#f1f3f9",
						"#e0e4ec",
						"#bdc6d9",
						"#98a6c8",
						"#788bb9",
						"#647ab0",
						"#5a72ad",
						"#4a6098",
						"#405688",
						"#344a79"]
				}

			}}
		>
			<Notifications position='top-center' autoClose={3000} />
			<App />
			<ScrollTop />
		</MantineProvider>
	</Provider>
)
