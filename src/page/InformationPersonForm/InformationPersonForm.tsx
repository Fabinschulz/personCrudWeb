import { FieldValues } from 'react-hook-form'
import TextFormField from '@/app/components/TextFormField'
import SelectFormField from '@/app/components/SelectFormField'
import { UF } from '@/service/zipCode/zipcode.types'

interface InfPersonFormProps {
  register: any
  errors: FieldValues
}

const InformationPersonForm: React.FC<InfPersonFormProps> = ({ ...props }) => {
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
              required
              type="text"
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
              name="phoneNumber"
              label="Telefone Celular"
              placeholder="(xx) xxxxx-xxxx"
              required
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
              required
              type="number"
              {...props}
            />
          </div>
          <div className="w-full">
            <TextFormField
              name="address.addressName"
              label="Endereço"
              required
              {...props}
            />
          </div>
          <div className="w-full">
            <TextFormField
              name="address.number"
              label="Número"
              required
              type="number"
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
            <TextFormField
              name="address.district"
              label="Bairro"
              required
              {...props}
            />
          </div>
          <div className="w-full">
            <TextFormField
              name="address.city"
              label="Cidade"
              required
              {...props}
            />
          </div>
          <div className="w-full">
            <SelectFormField
              options={UF}
              name="address.uf"
              label="UF"
              required
              {...props}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default InformationPersonForm
