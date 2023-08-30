'use client'
import InformationPersonForm from './InformationPersonForm'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  PersonFormSchema,
  defaultValuesPersonForm,
  validationSchemaPersonForm,
} from './validationSchema'
import { usePersonData, usePersonMutation } from '@/hooks/usePerson'
import { ApiResponseError } from '@/context/errorProvider'
import { IPersonFull } from '@/service/person/person.interface'
import { useState } from 'react'
import Toast from '@/app/components/Toast'
import { BsArrowLeftCircle } from 'react-icons/bs'
import CustomLinearProgress from '@/app/components/Loading'

type Props = {
  personId: string
}

export type ToastType = {
  message: string
  severity: 'success' | 'error'
  open: boolean
}

export default function InformationPersonContainer({ personId }: Props) {
  const { data, isFetching } = usePersonData(personId)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: (data as any) ?? defaultValuesPersonForm,
    resolver: yupResolver(validationSchemaPersonForm()),
  })
  const [toast, setToast] = useState<ToastType>({
    message: '',
    severity: 'success',
    open: false,
  })

  const onSuccess = (data: IPersonFull) => {
    setToast({
      message: 'Dados salvos com sucesso!',
      severity: 'success',
      open: true,
    })
  }

  const onError = (error: ApiResponseError) => {
    setToast({
      message: `Ops! Ocorreu um erro ao salvar os dados: ${error.message}`,
      severity: 'error',
      open: true,
    })
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
      {(isFetching || isLoading) && <CustomLinearProgress />}
      <Toast
        open={toast.open}
        onClose={() => {
          setToast({ ...toast, open: false })
        }}
        message={toast.message}
        severity={toast.severity}
      />
      <section className="my-24 flex items-center justify-center">
        <div className="rounded-lg border border-[##BABFD0] p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto">
            <div className="mb-8 flex flex-col items-center justify-between md:mb-16 md:flex-row">
              <h1 className="text-xl font-bold md:text-4xl">Informações</h1>
              <div className="mt-4 flex items-center justify-between md:mt-6 md:justify-start">
                <button
                  type="button"
                  className="mr-4 rounded-lg border border-[#081b29] bg-[#081b29] px-5 py-2 font-bold text-sky-200 hover:border-sky-500 hover:bg-transparent hover:text-sky-500 md:px-8 md:py-3"
                >
                  <a href="/">
                    <BsArrowLeftCircle className="mr-1 inline-block h-5 w-5" />
                    Home
                  </a>
                </button>
                <button
                  type="submit"
                  className="rounded-lg border border-[#081b29] bg-[#081b29] px-6 py-2 font-bold text-sky-200 hover:border-sky-500 hover:bg-transparent hover:text-sky-500 md:px-10 md:py-3"
                >
                  Salvar
                </button>
              </div>
            </div>

            <InformationPersonForm {...{ errors, register, setValue }} />
          </form>
        </div>
      </section>
    </>
  )
}
