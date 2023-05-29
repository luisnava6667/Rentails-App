'use client'

import { FC } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { BiDollar } from 'react-icons/bi'
interface InputProps {
  id: string
  label: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}
export const Input: FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors
}) => {
  return (
    <div className='w-full relative'>
      {formatPrice && (
        <BiDollar
          size={24}
          className='text-neutral-700 absolute top-5 left-2 '
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=' '
        type={type}
        className={`w-full peer p-4 pt-6 font-light bg-white rounded-md border-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
          formatPrice ? 'pl-9' : 'pl-4'
        } ${
          errors[id]
            ? 'border-rose-500 focus:border-rose-500'
            : 'border-neutral-300 focus:border-black'
        } focus:border-primary-500`}
      />
      <label
        className={`absolute text-ms duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
        ${formatPrice ? 'left-9' : 'left-4'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}

        
      `}>
        {label}
      </label>
    </div>
  )
}
