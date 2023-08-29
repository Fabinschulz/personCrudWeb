import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError, isAxiosError } from 'axios'
import { useState } from 'react'
import { editOrCreate, getPersonById, getPersonsList } from '@/service/person'
import { formatDocumentNumber } from '@/service/format'
import {
  ApiResponseError,
  GetListApiResponse,
  GetListApiResponseSuccess,
  GetViewApiResponse,
  useApiRequest,
} from '@/context/errorProvider'
import {
  IPersonListProps,
  IPersonFull,
} from '@/service/person/person.interface'
import { PersonFormSchema } from '@/page/InformationPersonForm/validationSchema'

export function usePersonsList(filters: IPersonListProps) {
  const [personList, setPersonList] = useState<Record<string, any>>([])
  const { startRequest, endRequest, setSubmitError } = useApiRequest()

  const { status, error, data, isFetching, refetch } = useQuery({
    enabled: !!filters,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ['persons-list', filters],
    queryFn: async (): Promise<GetListApiResponse<IPersonFull>> => {
      startRequest()
      const resp = await getPersonsList(filters)
      const { data, status, statusText } = resp
      endRequest(true)

      if (isAxiosError(data)) {
        setSubmitError({
          type: 'error',
          code: status + '' + statusText,
          message: data.message,
          errors: data.response?.data?.errors,
        })
        throw data
      }

      if (status >= 400 && status <= 599) {
        throw data
      }

      const dataSuccess = data as GetListApiResponseSuccess<IPersonFull>
      const options = dataSuccess.data.map((item) => ({
        label: `${item.personName || 'Não informado'} - (${formatDocumentNumber(
          item.registrationNumber,
        )})`,
        value: item.personId,
      }))
      setPersonList(options)

      return dataSuccess
    },
  })

  return {
    status,
    personList,
    data,
    error,
    isFetching,
    refetch,
  }
}

export function usePersonData(personId: string) {
  const { startRequest, endRequest, setSubmitError } = useApiRequest()

  const { status, data, error, isFetching, refetch } = useQuery({
    enabled: personId !== 'new',
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ['personId', personId],
    queryFn: async (): Promise<GetViewApiResponse<IPersonFull>> => {
      startRequest()
      const { data, status, statusText } = await getPersonById(personId)

      if (isAxiosError(data)) {
        setSubmitError({
          type: 'error',
          code: status + '' + statusText,
          message: data.message,
          errors: data.response?.data?.errors,
        })
        throw data
      }

      if (status >= 400 && status <= 599) {
        throw data
      }

      endRequest(true)
      return data as GetViewApiResponse<IPersonFull>
    },
  })

  return {
    status,
    data,
    error,
    isFetching,
    refetch,
  }
}

export function usePersonMutation(
  personId: string,
  onSuccess: (data: IPersonFull) => void,
  onError: (error: ApiResponseError) => void,
) {
  const { startRequest, endRequest, setSubmitError } = useApiRequest()

  const { mutateAsync, isLoading, error } = useMutation({
    mutationFn: async (values: PersonFormSchema) => {
      startRequest()
      const { data, status, statusText } = await editOrCreate(values, personId)

      if (isAxiosError(data)) {
        setSubmitError({
          type: 'error',
          code: status + '' + statusText,
          message: data.message,
          errors: data.response?.data?.errors,
        })
        endRequest(true)
        throw data
      }

      if (status >= 400 && status <= 599) {
        throw data
      }

      return data as IPersonFull
    },
    onSuccess(data, variables, _) {
      onSuccess(data)
    },
    onError(error, variables, _) {
      const message =
        'Erro desconhecido. Por favor, entre em contato com o suporte técnico.'
      let apiError: ApiResponseError = {
        type: 'error',
        message,
        code: 'UNKNOWN',
        errors: [],
      }
      if (isAxiosError(error)) {
        const axErr = error as AxiosError
        apiError = { type: 'error', code: axErr.code!, errors: [], ...axErr }
        const { response } = axErr
        if (response) {
          const { data } = response
          const respData = data as ApiResponseError
          if (data) {
            apiError = respData
          }
        }
      }
      endRequest(false)
      setSubmitError(apiError)
      onError(apiError)
    },
  })

  return { mutateAsync, isLoading, error }
}
