import type { AppProps } from "next/app";
import { IntlProvider } from "next-intl"; // correct import
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps & { pageProps: { messages: string; locale: string } }) {
  return (
    <IntlProvider locale={pageProps.locale} messages={pageProps.messages}>
      <Component {...pageProps} />
    </IntlProvider>
  );
}