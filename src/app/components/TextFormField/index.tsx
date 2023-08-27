/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { FieldError } from 'react-hook-form'

type TextFormFieldProps = {
  name: string
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  errors: FieldError | undefined
  register: any
  message: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TextFormField = (props: TextFormFieldProps) => {
  const {
    name,
    label,
    required,
    register,
    errors,
    message,
    type,
    placeholder,
    onChange,
  } = props

  return (
    <>
      <label
        className="mb-2 block text-xs font-bold uppercase tracking-wide text-zinc-600"
        htmlFor={`grid-${name}`}
      >
        {`${label} ${required ? '*' : ''}`}
      </label>
      <input
        {...register(name)}
        className={`block w-full appearance-none border-[3px] text-zinc-700 ${
          errors
            ? 'border-red-500 focus:border-sky-500 focus:shadow-sm'
            : 'border-sky-500 focus:shadow-sm focus:shadow-cyan-500'
        } mb-2 rounded px-4 py-3 leading-tight focus:outline-none 
                `}
        id={`input-${name}`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
      />
      <p className="text-xs italic text-red-500">{message}</p>
    </>
  )
}

export default TextFormField
