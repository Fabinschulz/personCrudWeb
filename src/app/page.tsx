import dynamic from 'next/dynamic'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pessoas',
  description: 'Lista de pessoas cadastradas.',
}

const DinamicPersonList = dynamic(
  () => import('@/page/PersonList/PersonListContainer'),
  {
    ssr: true,
  },
)

export default function Home() {
  return (
    <main className="h-screen items-center justify-center p-10 md:p-20">
      <DinamicPersonList />
    </main>
  )
}
