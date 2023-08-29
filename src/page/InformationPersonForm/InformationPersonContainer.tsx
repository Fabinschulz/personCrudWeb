'use client'
import InformationPersonForm from './InformationPersonForm'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  PersonFormSchema,
  defaultValuesPersonForm,
  validationSchemaPersonForm,
} from './validationSchema'
import { usePersonMutation } from '@/hooks/usePerson'
import { ApiResponseError } from '@/context/errorProvider'
import { IPersonFull } from '@/service/person/person.interface'

type Props = {
  personId: string
}

export default function InformationPersonContainer({ personId }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValuesPersonForm,
    resolver: yupResolver(validationSchemaPersonForm()),
  })

  const onSuccess = (data: IPersonFull) => {
    console.log('Sucesso', data)
  }

  const onError = (error: ApiResponseError) => {
    console.log('Erro', error)
  }

  const { mutateAsync, isLoading } = usePersonMutation(
    personId,
    onSuccess,
    onError,
  )

  const onSubmit = async (data: PersonFormSchema) => {
    mutateAsync(data)
  }

  return (
    <>
      {isLoading && <div>Carregando...</div>}
      <section className="my-24 flex items-center justify-center">
        <div className="rounded-lg border border-[##BABFD0] p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto">
            <div className="mb-8 flex flex-col items-center justify-between md:mb-16 md:flex-row">
              <h1 className="text-xl font-bold md:text-4xl">Informações</h1>
              <div className="mt-4 flex items-center justify-center md:mt-6 md:justify-start">
                <button
                  type="submit"
                  className="rounded-lg border border-[#081b29] bg-[#081b29] px-6 py-2 font-bold text-sky-200 hover:border-sky-500 hover:bg-transparent hover:text-sky-500 md:px-10 md:py-3"
                >
                  Salvar
                </button>
              </div>
            </div>
            <InformationPersonForm register={register} errors={errors} />
          </form>
        </div>
      </section>
    </>
  )
}
