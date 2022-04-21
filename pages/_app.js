import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import { ColorModeScript } from '@chakra-ui/react'
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      < ColorModeScript initialColorMode={theme.config.initialColorMode}/>
      <Component {...pageProps} />;
    </ChakraProvider>
  );
}

export default MyApp;
