import React, { createContext, useContext, useState } from 'react'

export type GetListApiResponseSuccess<T> = {
  type: 'success'
  data: T[]
  page: number
  totalItems: number
  totalPages: number
}

export type ApiResponseError = {
  type: 'error'
  code: string | number
  errors: string[]
  message: string | undefined
}

type GetViewApiResponseSuccess<T> = {
  type: 'success'
  data: T
} & T

export type GetViewApiResponse<T> =
  | GetViewApiResponseSuccess<T>
  | ApiResponseError

export type GetListApiResponse<T> =
  | GetListApiResponseSuccess<T>
  | ApiResponseError

interface ApiRequestProviderProps {
  children: JSX.Element
}

type ApiRequestContextProps = {
  submitting: boolean
  startRequest: () => void
  endRequest: (success: boolean) => void
  submitError: ApiResponseError | undefined
  setSubmitError: (err: ApiResponseError | undefined) => void
}

const ApiRequestContext = createContext<ApiRequestContextProps>({
  submitting: false,
  startRequest: () => {},
  endRequest: () => {},
  submitError: undefined,
  setSubmitError: () => {},
})

export const ApiRequestProvider = ({ children }: ApiRequestProviderProps) => {
  const [submitting, setsubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<ApiResponseError | undefined>(
    undefined,
  )

  return (
    <ApiRequestContext.Provider
      value={{
        submitting,
        startRequest: () => setsubmitting(true),
        endRequest: (success: boolean) => {
          setsubmitting(false)
          if (success && submitError) {
            setSubmitError(undefined)
          }
        },
        submitError,
        setSubmitError,
      }}
    >
      {children}
    </ApiRequestContext.Provider>
  )
}

export function useApiRequest(): ApiRequestContextProps {
  const context = useContext(ApiRequestContext)
  const { submitting, startRequest, endRequest, submitError, setSubmitError } =
    context

  return {
    submitting,
    startRequest,
    endRequest,
    submitError,
    setSubmitError,
  }
}
