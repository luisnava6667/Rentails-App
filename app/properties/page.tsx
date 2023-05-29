import { getCurrentUser,  getListings } from '../actions'
import { ClientOnly } from '../components/ClientOnly'
import { EmptyState } from '../components/EmptyState'

import { PropertiesClient } from './PropertiesClient'


const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Unauthorized' subtitle='Pleace login' />
      </ClientOnly>
    )
  }
  const listings = await getListings({
    userId: currentUser.id
  })
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No properties found'
          subtitle='Lools like you have no properties'
        />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default PropertiesPage
