import { PersonFormSchema } from '@/page/InformationPersonForm/validationSchema'
import axiosApi from '../axiosApi/axiosApi'
import { IPersonListProps } from './person.interface'

const url = `/Person`
export const getPersonsList = async (filters: IPersonListProps) => {
  const config = {
    headers: {},
    params: filters,
  }

  return await axiosApi.get(url, config)
}

export async function getPersonById(personId: string) {
  const config = {
    headers: {},
  }

  return await axiosApi.get(url + `/${personId}`, config)
}

export async function editOrCreate(data: PersonFormSchema, personId: string) {
  const isCreating = personId === 'new'
  const endpoint = isCreating ? url : `${url}/${personId}`
  const onlyNumbers = /\D/g

  const payload = {
    ...data,
    registrationNumber: data?.registrationNumber?.replace(onlyNumbers, ''),
    phoneNumber: data?.phoneNumber?.replace(onlyNumbers, ''),
  }

  const axiosConfig = {
    headers: {},
  }

  const axiosFunction = isCreating ? axiosApi.post : axiosApi.put

  return await axiosFunction(endpoint, payload, axiosConfig)
}

export async function deletePersonById(personId: string) {
  const config = {
    headers: {},
  }

  try {
    return await axiosApi.delete(url + `/${personId}`, config)
  } catch (error) {
    return `Ops, ocorreu um erro ao deletar o registro, tente novamente mais tarde. Erro: ${error}`
  }
}
