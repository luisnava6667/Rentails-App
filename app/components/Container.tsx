'use client'
import { FC } from 'react'
interface ContainerProps {
  children: React.ReactNode
}
export const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className='max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4'>
      {children}
    </div>
  )
}
