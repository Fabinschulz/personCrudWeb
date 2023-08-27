'use client'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { object, string } from 'yup'
import TextFormField from '@/app/components/TextFormField'
import Toast from '@/app/components/Toast'
import { env } from 'process'
import axiosApi from '@/service/axiosApi'

function validationSchemaContactForm() {
  return object().shape({
    firstName: string()
      .required('Nome é obrigatório')
      .matches(/^[a-zA-Z\s]+$/, 'Nome precisa conter apenas letras alfabéticas')
      .nullable(),
    lastName: string()
      .required('Sobrenome é obrigatório')
      .matches(
        /^[a-zA-Z\s]+$/,
        'Sobrenome precisa conter apenas letras alfabéticas',
      )
      .nullable(),
    email: string()
      .email('E-mail inválido')
      .required('Email é obrigatório')
      .test('email', 'Email inválido', (value) => {
        if (value) {
          const email = value as string
          const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/

          return emailRegex.test(email)
        }

        return false
      })
      .nullable(),
    message: string()
      .required('Mensagem é obrigatória')
      .min(10, 'Mensagem deve ter no mínimo 10 caracteres')
      .nullable(),
    phoneNumber: string().required('Telefone é obrigatório').nullable(),
  })
}

const defaultValuesContactForm = {
  firstName: null,
  lastName: null,
  email: null,
  message: null,
  phoneNumber: null,
}

function InformationPersonForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValuesContactForm,
    resolver: yupResolver(validationSchemaContactForm()),
  })
  const [toast, setToast] = useState({
    message: '',
    type: 'error',
  })

  const onSubmit = async (data: FieldValues) => {
    const url = `${env.BASE_API_URL}/Contact`
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      await axiosApi.post(url, data, config)
      setToast({
        message: 'Mensagem enviada com sucesso!',
        type: 'success',
      })
    } catch (error) {
      setToast({
        message: `Erro ao enviar mensagem! ${error}`,
        type: 'error',
      })
    }
  }

  const handleToastClose = () => {
    setToast({
      message: '',
      type: 'error',
    })
  }

  return (
    <>
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleToastClose}
        />
      )}
      <section className="flex items-center justify-center">
        <h1 className="text-3xl font-extrabold text-sky-600 md:text-7xl">
          Informações
        </h1>
      </section>
    </>
  )
}
export default InformationPersonForm
