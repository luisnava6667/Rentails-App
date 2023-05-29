'use client'
import { FC, MouseEvent } from 'react'
import { IconType } from 'react-icons'

interface ButtonProps {
  label: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  outline?: boolean
  small?: boolean
  icon?: IconType
}
export const Button:FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon:Icon
}) => {
  return <button onClick={onClick} disabled={disabled} className={`
    relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full 
    ${outline ? 'bg-white border-black text-black' : 'bg-rose-500 text-white'}
    ${small ? 'py-1 font-light border-[1px] text-sm' : 'py-3 font-semibold border-2 text-md'}
  `}>
    {Icon && <Icon size={24} className='absolute left-4 top-3'/>}
    {label}
  </button>
}
