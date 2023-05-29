
import { ClientOnly } from '@/app/components/ClientOnly'
import { ListingClient } from './ListingClient'
import {getCurrentUser, getListingById} from '@/app/actions'
import { EmptyState } from '@/app/components/EmptyState'
import getReservations from '@/app/actions/getReservations'

interface IParams {
  listingId?: string
}
const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} reservations={reservations}/>
    </ClientOnly>
  )
}

export default ListingPage
