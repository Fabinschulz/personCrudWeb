import dynamic from 'next/dynamic'
import { Metadata } from 'next'
const DinamicInformationPage = dynamic(
  () => import('@/page/InformationPersonForm/InformationPersonContainer'),
  {
    loading: () => <>carregando...</>,
  },
)

export const metadata: Metadata = {
  title: 'Register Person',
  description: 'Form to register a person.',
}

interface IPersonFormProps {
  params: {
    personId?: string
  }
}

export default function PersonForm({ params }: IPersonFormProps) {
  const { personId = '' } = params
  return <DinamicInformationPage personId={personId} />
}
