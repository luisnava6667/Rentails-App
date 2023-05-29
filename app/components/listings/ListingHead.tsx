'use client'

import { SafeUser } from '@/app/types'
import { FC } from 'react'
import Image from 'next/image'

import { useCountries } from '@/app/hooks'
import { Heading } from '../Heading'
import { HeartButton } from '../HeartButton'

interface ListingHeadProps {
  title: string
  locationValue: string
  imageSrc: string
  id: string
  currentUser?: SafeUser | null
}
export const ListingHead: FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser
}) => {
  const { getByValue } = useCountries()
  const location = getByValue(locationValue)
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region} - ${location?.label}`}
      />
      <div className='w-full h-[60vh] relative overflow-hidden rounded-xl'>
        <Image
          alt={title}
          src={imageSrc}
          fill
          className='object-cover w-full'
        />
      <div className='absolute top-4 right-5'>
        <HeartButton listingId={id} currentUser={currentUser} />
      </div>
      </div>
    </>
  )
}
