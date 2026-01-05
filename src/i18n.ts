// import { notFound } from "next/navigation";
// import { getRequestConfig } from "next-intl/server";

// export const locales = ["en", "hi", "mr"] as const;
// export type Locale = (typeof locales)[number];

// export const defaultLocale: Locale = "mr";

// export default getRequestConfig(async ({ locale }) => {
//   const resolvedLocale = (locale ?? defaultLocale) as Locale;

//   if (!locales.includes(resolvedLocale)) {
//     notFound();
//   }

//   return {
//     locale: resolvedLocale, // ✅ REQUIRED
//     messages: (await import(`./messages/${resolvedLocale}.json`)).default
//   };
// });
