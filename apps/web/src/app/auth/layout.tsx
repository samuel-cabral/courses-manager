export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-xs">{children}</div>
    </div>
  )
}
