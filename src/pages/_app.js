// import '../styles/globals.css'
import {initializeFirebase} from "../utils/firebase";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {grey, yellow} from "@mui/material/colors";

const theme = createTheme({
    spacing: 8,
    palette: {
        primary: {
            main: yellow[300],
        },
        secondary: {
            main: grey[500]
        }
    }
});

function MyApp({Component, pageProps}) {

    initializeFirebase();

    return <ThemeProvider theme={theme}>
        <Container component={"main"}>
            <CssBaseline/>
            <Component {...pageProps} />
        </Container>
    </ThemeProvider>
}

export default MyApp
