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
    <main className="h-screen items-center justify-center p-10">
      <div className="rounded-lg border border-[##BABFD0] p-10">
        <h1 className="mb-16 text-2xl font-bold md:text-4xl">Pessoas</h1>
        <DinamicPersonList />
      </div>
    </main>
  )
}
