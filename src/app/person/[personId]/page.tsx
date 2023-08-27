import dynamic from 'next/dynamic'
import { Metadata } from 'next'
// const DynamicLayout = dynamic(() => import('@/components/Layout'))
const DinamicInformationPage = dynamic(
  () => import('@/page/InformationPersonForm'),
)

export const metadata: Metadata = {
  title: 'Cadastro de Pessoa',
  description: 'Formulário de cadastro de pessoa.',
}

export default function Contact() {
  return <DinamicInformationPage />
}
