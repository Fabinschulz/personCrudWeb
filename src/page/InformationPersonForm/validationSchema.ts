/* eslint-disable no-useless-escape */
import { object, string, InferType } from 'yup'

export function validationSchemaPersonForm() {
  return object().shape({
    personName: string()
      .required('Nome: Precisa ser preenchido')
      .matches(
        /^[a-zA-Z\s]+$/,
        'Nome precisa conter apenas letras alfabéticas',
      ),
    registrationNumber: string()
      .required('Número de registro é obrigatório')
      .matches(
        /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
        'Número de registro inválido. Ex: 000.000.000-00',
      ),
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
    phoneNumber: string().required('Telefone é obrigatório'),
    address: object().shape({
      addressName: string()
        .typeError('Endereço inválido.')
        .required('Endereço: Precisa ser preenchido.'),
      zipCode: string()
        .typeError('CEP inválido.')
        .required('CEP: Precisa ser preenchido.'),
      city: string()
        .typeError('Cidade inválida.')
        .required('Cidade: Precisa ser preenchido.'),
      uf: string()
        .typeError('UF inválida.')
        .required('UF: Precisa ser preenchido.'),
      district: string()
        .typeError('Bairro inválido.')
        .required('Bairro: Precisa ser preenchido.'),
      number: string()
        .typeError('Valor precisa ser um número.')
        .required('Número: Precisa ser preenchido.'),
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
}
