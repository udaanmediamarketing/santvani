// export default function Layout({ children }: { children: React.ReactNode }) {
//   return <div className="min-h-screen bg-gradient-to-br from-white to-orange-50">{children}</div>;
// }

//import Footer from "./footer";


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
          flex flex-col
        "
      >
        {/* Page Content */}
        <main className="flex-grow">
          {children}
        </main>

      </body>
    </html>
  );
}
