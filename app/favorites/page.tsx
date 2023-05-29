import { FavoritesClient } from './FavoritesClient'
import {getCurrentUser, getFavoriteListings} from '../actions'
import { ClientOnly } from '../components/ClientOnly'
import { EmptyState } from '../components/EmptyState'


const FavoritePage = async () => {
  const listing = await getFavoriteListings()
  const currentUser = await getCurrentUser()
  if (listing.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No favorites found'
          subtitle='Looks like you have no favorites listings.'
        />
      </ClientOnly>
    )
  }
    return (
        <ClientOnly>
            <FavoritesClient listings={listing} currentUser={currentUser}/>
        </ClientOnly>
    )
}

export default FavoritePage
