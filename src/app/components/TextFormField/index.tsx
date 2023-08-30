/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentProps } from 'react'
import { FieldValues } from 'react-hook-form'

type TextFormFieldProps = ComponentProps<'input'> & {
  name: string
  label: string
  errors: FieldValues
  register: any
}

export function resolve(path: string, obj: Record<string, any>): any {
  const properties = path.split('.')
  return properties.reduce((previousValue, currentValue) => {
    if (previousValue && typeof previousValue === 'object') {
      return previousValue[currentValue]
    }
    return undefined
  }, obj)
}

const TextFormField: React.FC<TextFormFieldProps> = ({
  name,
  label,
  required,
  register,
  errors,
  onChange,
  ...props
}) => {
  const error = errors && resolve(name, errors)?.message

  return (
    <>
      <label
        className="mb-2 block text-xs font-bold uppercase tracking-wide text-zinc-600"
        htmlFor={`grid-${name}`}
      >
        {`${label} ${required ? '*' : ''}`}
      </label>
      <input
        {...props}
        {...register(name)}
        data-cy={name}
        className={`block w-full appearance-none border-[2px] text-zinc-700 ${
          error
            ? 'border-red-500 focus:border-sky-500 focus:shadow-sm'
            : 'border-zinc-500 focus:border-sky-500 focus:shadow-sm'
        } mb-2 rounded px-4 py-3 leading-tight focus:outline-none 
                `}
        id={`input-${name}`}
        onChange={onChange}
        required={false}
      />
      {error && <p className="text-xs italic text-red-500">{error}</p>}
    </>
  )
}

export default TextFormField
