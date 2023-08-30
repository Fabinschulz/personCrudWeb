/* eslint-disable no-useless-escape */
import { object, string, InferType, date } from 'yup'

export function validationSchemaPersonForm() {
  return object().shape({
    personName: string()
      .required('Nome: Precisa ser preenchido')
      .matches(
        /^[a-zA-Z\s]+$/,
        'Nome precisa conter apenas letras alfabéticas',
      ),
    registrationNumber: string()
      .matches(
        /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
        'Número de registro inválido. Ex: 000.000.000-00',
      )
      .nullable(),
    email: string()
      .email('E-mail inválido')
      .required('Email: Precisa ser preenchido')
      .test('email', 'Email inválido', (value) => {
        if (value) {
          const email = value as string
          const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/
          return emailRegex.test(email)
        }

        return false
      }),
    birthDate: date()
      .required('Data de nascimento: Precisa ser preenchido.')
      .typeError('Data de nascimento é obrigatória.')
      .max(
        new Date(),
        'A data de nascimento não pode ser maior que a data atual.',
      ),
    phoneNumber: string().nullable(),
    address: object().shape({
      addressName: string().typeError('Endereço inválido.').nullable(),
      zipCode: string().typeError('CEP inválido.').nullable(),
      city: string().typeError('Cidade inválida.').nullable(),
      uf: string().typeError('UF inválida.').nullable(),
      district: string().typeError('Bairro inválido.').nullable(),
      number: string().typeError('Valor precisa ser um número.').nullable(),
      complement: string().nullable(),
    }),
  })
}

const inferedSchema = validationSchemaPersonForm()
export type PersonFormSchema = InferType<typeof inferedSchema>

export const defaultValuesPersonForm = {
  personName: '',
  registrationNumber: '',
  email: '',
  phoneNumber: '',
  address: {
    addressName: '',
    zipCode: '',
    city: '',
    uf: '',
    district: '',
    number: '',
    complement: '',
  },
  birthDate: null,
}
