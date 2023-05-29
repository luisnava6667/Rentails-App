'use client'
import Image from 'next/image'
import { FC } from 'react'
interface AvatarProps {
  src: string | null | undefined
}
export const Avatar:FC<AvatarProps> = ({src}) => {
  return (
    <Image
      className='rounded-full'
      height={30}
      width={30}
      alt='Avatar'
      src={src || '/images/placeholder.jpg'}
    />
  )
}
