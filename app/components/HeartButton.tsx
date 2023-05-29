'use client'
import { FC } from 'react'
import { SafeUser } from '../types'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useFavorite } from '../hooks'
interface HeartButtonProps {
  listingId: string
  currentUser?: SafeUser | null
}

export const HeartButton: FC<HeartButtonProps> = ({
  listingId,
  currentUser
}) => {
  const { hasFavorite, toggleFavorite } = useFavorite({
    listingId,
    currentUser
  })
  return (
    <div
      className='relative cursor-pointer transition hover:opacity-80'
      onClick={toggleFavorite}>
      <AiOutlineHeart
        size={28}
        className='fill-white absolute top-[-2px] right-[-2px]'
      />
      <AiFillHeart
        size={24}
        className={hasFavorite ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </div>
  )
}
