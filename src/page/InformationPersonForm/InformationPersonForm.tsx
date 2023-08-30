import { FieldValues, UseFormSetValue } from 'react-hook-form'
import TextFormField from '@/app/components/TextFormField'
import SelectFormField from '@/app/components/SelectFormField'
import { UF } from '@/service/zipCode/zipcode.types'
import { queryZipCodeForm } from '@/service/zipCode'

interface IPersonFormProps {
  register: any
  errors: FieldValues
  setValue: UseFormSetValue<any>
}

const InformationPersonForm = ({ setValue, ...props }: IPersonFormProps) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div className="w-full">
            <TextFormField
              name="personName"
              label="Nome"
              placeholder="Seu nome"
              required
              {...props}
            />
          </div>
          <div className="w-full">
            <TextFormField
              name="registrationNumber"
              label="CPF"
              placeholder="Digite seu CPF"
              type="text"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const { value } = event.target
                const cpf = value.replace(/\D/g, '')

                const maskedCpf = cpf.replace(
                  /(\d{3})(\d{3})(\d{3})(\d{2})/,
                  '$1.$2.$3-$4',
                )
                event.target.value = maskedCpf
              }}
              {...props}
            />
          </div>
          <div className="w-full">
            <TextFormField
              name="email"
              label="E-mail"
              placeholder="Seu e-mail"
              required
              type="text"
              {...props}
            />
          </div>
          <div className="w-full">
            <TextFormField
              name="birthDate"
              label="Data de nascimento"
              placeholder="dd/mm/aaaa"
              type="date"
              required
              {...props}
            />
          </div>
          <div className="w-full">
            <TextFormField
              name="phoneNumber"
              label="Telefone Celular"
              placeholder="(xx) xxxxx-xxxx"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const { value } = event.target
                const phoneNumber = value
                  .replace(/\D/g, '')
                  .replace(/(\d{2})(\d)/, '($1) $2')
                  .replace(/(\d{5})(\d)/, '$1-$2')
                  .replace(/(-\d{4})\d+?$/, '$1')

                event.target.value = phoneNumber
              }}
              {...props}
            />
          </div>
          <div className="w-full">
            <TextFormField
              name="address.zipCode"
              label="CEP"
              placeholder="00000-000"
              type="text"
              maxLength={9}
              onChange={(event) => {
                const { value } = event.target
                const zipcode = value.replace(/\D/g, '')

                const maskedZipCode = zipcode.replace(
                  /(\d{5})(\d{0,3})/,
                  '$1-$2',
                )
                event.target.value = maskedZipCode

                if (zipcode.length === 8) {
                  queryZipCodeForm(zipcode, (fieldName, value) => {
                    setValue(`address.${fieldName}`, value)
                  })
                }
              }}
              {...props}
            />
          </div>
          <div className="w-full">
            <TextFormField
              name="address.addressName"
              label="Endereço"
              {...props}
            />
          </div>
          <div className="w-full">
            <TextFormField
              name="address.number"
              label="Número"
              type="number"
              min={0}
              {...props}
            />
          </div>
          <div className="w-full">
            <TextFormField
              name="address.complement"
              label="Complemento"
              {...props}
            />
          </div>
          <div className="w-full">
            <TextFormField name="address.district" label="Bairro" {...props} />
          </div>
          <div className="w-full">
            <TextFormField name="address.city" label="Cidade" {...props} />
          </div>
          <div className="w-full">
            <SelectFormField
              options={UF}
              name="address.uf"
              label="UF"
              {...props}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default InformationPersonForm
