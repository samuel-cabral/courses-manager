import { Header } from '@/components/header'
import { getProfile } from '@/http/get-profile'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await getProfile()

  return (
    <>
      <Header userEmail={user.email} />

      <div className="mx-auto max-w-[1200px] px-4">{children}</div>
    </>
  )
}
