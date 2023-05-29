'use client'

import { FC } from 'react'
import { IconType } from 'react-icons'
interface CategoryInputProps {
  onClick: (value: string) => void
  label: string
  selected?: boolean
  icon: IconType
}
export const CategoryInput: FC<CategoryInputProps> = ({
  onClick,
  label,
  icon: Icon,
  selected
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
       rounded-xl border-2 p-4 flex flex-row gap-3 hover:border-black transition cursor-pointer
         ${selected ? 'border-black' : 'border-natural-200'}
      `}
    >
        <Icon size={30} />
        <div className="font-semibold">{label}</div>
    </div>
  )
}
