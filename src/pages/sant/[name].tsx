// import { useRouter } from "next/router";
// import { useState } from "react";

// import SantNavbar from "../../components/sant-navbar";
// import SantDashboard from "../../components/sant/santdashboard";

// export default function SantPage() {
//   const router = useRouter();
//   const { name } = router.query;

//   const [activeMenu, setActiveMenu] = useState("home");

//   return (
//     <>
//       <SantNavbar onMenuClick={setActiveMenu} activeMenu={activeMenu} />
//       <SantDashboard
//         // name={name as string}
//         activeMenu={activeMenu}
//         setActiveMenu={setActiveMenu}
//       />
//     </>
//   );
// }


import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import SantNavbar from "../../components/sant-navbar";
import SantDashboard from "../../components/sant/santdashboard";

type Locale = "mr" | "hi" | "en";

export default function SantPage() {
  const router = useRouter();
  const { name } = router.query;
  const t = useTranslations(); // t(key: string) => string

  const [activeMenu, setActiveMenu] = useState("home");

  return (
    <>
      <SantNavbar onMenuClick={setActiveMenu} activeMenu={activeMenu} t={t} />
      <SantDashboard activeMenu={activeMenu} setActiveMenu={setActiveMenu} t={t} />
    </>
  );
}

// Load translations
export async function getStaticProps({ locale }: { locale: string }) {
  const activeLocale = locale || "mr";
  return {
    props: {
      messages: (await import(`../../locales/${activeLocale}.json`)).default,
      locale: activeLocale,
    },
  };
}

// Optional: generate paths for all locales (if using getStaticPaths)
export async function getStaticPaths() {
  return {
    paths: [
      { params: { name: "tukaram" }, locale: "mr" },
      { params: { name: "tukaram" }, locale: "hi" },
      { params: { name: "tukaram" }, locale: "en" },
    ],
    fallback: "blocking"
  };
}