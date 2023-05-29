'use client'

import { FC } from 'react'
import { SafeListing, SafeUser } from '../types'
import { Container } from '../components/Container'
import { Heading } from '../components/Heading'
import { ListingCard } from '../components/listings/ListingCard'

interface ListingCategoryProps {
  listings: SafeListing[]
  currentUser?: SafeUser | null
}
export const FavoritesClient: FC<ListingCategoryProps> = ({
  listings,
  currentUser
}) => {
  return (
    <Container>
      <Heading title='Favorites' subtitle='List of places you have favorited' />
      <div className='mt-110 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  )
}
