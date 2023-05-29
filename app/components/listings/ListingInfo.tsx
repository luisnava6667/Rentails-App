'use client'

import { useCountries } from '@/app/hooks'
import { SafeUser } from '@/app/types'
import { FC } from 'react'
import { IconType } from 'react-icons'

import dynamic from 'next/dynamic'
import { Avatar } from '../Avatar'
import { ListingCategory } from './ListingCategory'

const Map = dynamic(() => import('../Map'), { ssr: false })
interface ListingInfoProps {
  user: SafeUser
  category:
    | {
        icon: IconType
        label: string
        description: string
      }
    | undefined
  description: string
  roomCount: number
  guestCount: number
  bathroomCount: number
  locationValue: string
}
export const ListingInfo: FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue
}) => {
  const { getByValue } = useCountries()
  const coordinates = getByValue(locationValue)?.latlng
  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div className='text-xl font-semibold flex flex-row items-center gap-2'>
          <div className=''>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className='flex flex-row items-center gap-4 font-light text-neutral-500 '>
          <div className=''>{guestCount} guest</div>
          <div className=''>{roomCount} rooms</div>
          <div className=''>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className='text-ls font-light text-neutral-500'>{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  )
}
