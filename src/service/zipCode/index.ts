import { ZipCodeData } from './zipcode.types'
type ClearValueType = (field: string, value: string | null) => void

const clearAddressValues = (setFieldValue: ClearValueType) => {
  setFieldValue('addressName', null)
  setFieldValue('district', null)
  setFieldValue('city', null)
  setFieldValue('uf', null)
}

const queryZipCode = (zipCode: string): Promise<ZipCodeData> => {
  return fetch(`https://viacep.com.br/ws/${zipCode}/json/`).then((res) =>
    res.json(),
  )
}

export const queryZipCodeForm = (
  zipCode: string,
  setFieldValue: ClearValueType,
) => {
  setFieldValue('zipCode', zipCode)
  if (zipCode.length === 8) {
    queryZipCode(zipCode)
      .then((result) => {
        if (result.erro !== true) {
          setFieldValue('addressName', result.logradouro)
          setFieldValue('district', result.bairro)
          setFieldValue('city', result.localidade)
          setFieldValue('uf', result.uf)
        }
      })
      .catch(() => clearAddressValues(setFieldValue))
  } else {
    clearAddressValues(setFieldValue)
  }
}
