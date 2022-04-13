// import '../styles/globals.css'
import { initializeFirebase } from '../utils/firebase';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
	Container,
	createTheme,
	CssBaseline,
	ThemeProvider,
} from '@mui/material';
import { grey, yellow } from '@mui/material/colors';
import AppContext from '../context/AppContext';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Router from 'next/router';

/* Configure NProgress */
NProgress.configure({
	minimum: 0.3,
	easing: 'ease',
	speed: 200,
	showSpinner: true,
	trickleSpeed: 1000,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const theme = createTheme({
	spacing: 8,
	palette: {
		primary: {
			main: yellow[600],
		},
		secondary: {
			main: grey[500],
		},
		mode: 'dark',
	},
});

let contextValue = {
	showSnackbar: false,
};

function MyApp({ Component, pageProps }) {
	initializeFirebase();

	return (
		<AppContext.Provider value={contextValue}>
			<ThemeProvider theme={theme}>
				<Container component={'main'}>
					<CssBaseline />
					<Component {...pageProps} />
				</Container>
			</ThemeProvider>
		</AppContext.Provider>
	);
}

export default MyApp;
