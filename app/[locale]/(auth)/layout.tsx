export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <section className="flex min-h-screen flex-col">{children}</section>;
}
