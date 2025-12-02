// import type { AppProps, AppContext } from "next/app";
// import { IntlProvider } from "next-intl";
// import "../styles/globals.css";

// function App({ Component, pageProps }: AppProps & { pageProps: { messages: string; locale: string } }) {
//   return (
//     <IntlProvider locale={pageProps.locale} messages={pageProps.messages}>
//       <Component {...pageProps} />
//     </IntlProvider>
//   );
// }

// App.getInitialProps = async ({ ctx }: AppContext) => {
//   const locale = ctx.locale || "mr"; // Default Marathi
//   const messages = (await import(`../locales/${locale}.json`).catch(() => import("../locales/mr.json"))).default;

//   return {
//     pageProps: {
//       locale,
//       messages
//     }
//   };
// };

// export default App;

import type { AppProps } from "next/app";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;