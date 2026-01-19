import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "./components/navbar";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [activeMenu, setActiveMenu] = useState("home");

  return (
    <>
       <Navbar />
      <Component
        {...pageProps}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      

    </>
  );
}