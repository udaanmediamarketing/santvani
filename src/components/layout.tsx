export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-gradient-to-br from-white to-orange-50">{children}</div>;
}