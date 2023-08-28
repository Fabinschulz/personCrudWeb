import React from 'react'
import { FieldValues } from 'react-hook-form'
import { resolve } from '../TextFormField'

type SelectFormFieldProps = React.ComponentProps<'select'> & {
  name: string
  label: string
  errors: FieldValues
  register: any
  options: { value: string; label: string }[]
}

const SelectFormField: React.FC<SelectFormFieldProps> = ({
  name,
  label,
  errors,
  register,
  options,
  required,
  ...props
}) => {
  const error = errors && resolve(name, errors)?.message
  return (
    <div className="mb-4">
      <label
        className="mb-2 block text-xs font-bold uppercase tracking-wide text-zinc-600"
        htmlFor={`grid-${name}`}
      >
        {`${label} ${required ? '*' : ''}`}
      </label>
      <select
        {...register(name)}
        id={name}
        className={`block w-full  border-[2px] text-zinc-700 ${
          error
            ? 'border-red-500 focus:border-sky-500 focus:shadow-sm'
            : 'border-zinc-500 focus:border-sky-500 focus:shadow-sm'
        } mb-2 rounded px-4 py-3 leading-tight focus:outline-none
                  `}
        {...props}
      >
        <option value="" disabled>
          Selecione
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs italic text-red-500">{error}</p>}
    </div>
  )
}

export default SelectFormField
