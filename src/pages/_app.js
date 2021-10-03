import "../../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
// import "../../styles/datepicker.css";
// import "react-datepicker/dist/react-datepicker.css";

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
