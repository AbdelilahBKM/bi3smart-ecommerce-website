import "../styles/global.css";
import "../styles/button.css";
import "../styles/text.css";
import "../styles/layout.css";
import type { AppProps } from "next/app";
import Layout from "../components/common/layout";
import StoreProvider from "../store/storeProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </StoreProvider>
  );
}

export default MyApp;
