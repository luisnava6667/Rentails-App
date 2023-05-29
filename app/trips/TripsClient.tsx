'use client'

import { FC, useCallback, useState } from 'react'
import { SafeReservation, SafeUser } from '../types'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Container } from '../components/Container'
import { Heading } from '../components/Heading'
import { ListingCard } from '../components/listings/ListingCard'

interface PropertiesClientProps {
  reservations: SafeReservation[]
  currentUser?: SafeUser | null
}
export const TripsClient: FC<PropertiesClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter()
  const [deletindId, setDeletindId] = useState('')
  const onCancel = useCallback(
    (id: string) => {
      setDeletindId(id)
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation canceled')
          router.refresh()
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error)
        })
        .finally(() => {
          setDeletindId('')
        })
    },
    [router]
  )
  return (
    <Container>
      <Heading
        title='Trips'
        subtitle="Where you've been and where you're going"
      />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletindId === reservation.id}
            actionLabel='Cancel reservation'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}
