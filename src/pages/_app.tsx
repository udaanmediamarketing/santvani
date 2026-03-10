import type { AppProps } from "next/app";
import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "sonner";

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider> 
      <Toaster richColors position="bottom-right" />
      <Component {...pageProps} />;
    </AuthProvider>
  );
}

export default App;