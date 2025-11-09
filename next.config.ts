import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["mr", "hi", "en"], // Marathi + English
    defaultLocale: "mr",   // Marathi is default
  },
};

export default nextConfig;
