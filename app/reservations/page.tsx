
import {getCurrentUser} from '../actions'
import getReservations from '../actions/getReservations'
import { ClientOnly } from '../components/ClientOnly'
import { EmptyState } from '../components/EmptyState'
import { ReservationsClient } from './ReservationsClient'

const ReservationPage = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Unauthorized' subtitle='Please login' />
      </ClientOnly>
    )
  }
  const reservation = await getReservations({
    authorId: currentUser.id
  })
  if (reservation.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No reservations found'
          subtitle='Looks like you have no reservation on your properties'
        />
      </ClientOnly>
    )
  }
  return <ClientOnly>
    <ReservationsClient 
      reservations={reservation}
      currentUser={currentUser}
    />
  </ClientOnly>
}

export default ReservationPage
