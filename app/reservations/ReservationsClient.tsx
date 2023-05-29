'use client'
import { FC, useState, useCallback } from 'react'
import { SafeReservation, SafeUser } from '../types'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Container } from '../components/Container'
import { Heading } from '../components/Heading'
import { ListingCard } from '../components/listings/ListingCard'
interface ReservationsClientProps {
  reservations: SafeReservation[]
  currentUser?: SafeUser
}
export const ReservationsClient: FC<ReservationsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)
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
          setDeletingId('')
        })
    },
    [router]
  )
  return (
    <Container>
      <Heading title='Reservations' subtitle='Booking on your properties' />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel='Cancel guest reservation'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}
