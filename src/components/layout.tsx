// export default function Layout({ children }: { children: React.ReactNode }) {
//   return <div className="min-h-screen bg-gradient-to-br from-white to-orange-50">{children}</div>;
// }


// import { ThemeProvider } from "../app/providers/theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="
          min-h-screen
          bg-gradient-to-br from-white to-orange-50
          dark:from-zinc-900 dark:to-zinc-800
          text-black dark:text-white
          transition-colors
        "
      >
        {children}
        {/* <ThemeProvider>{children}</ThemeProvider> */}
      </body>
    </html>
  );
}
