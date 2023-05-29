'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BiBuildingHouse } from 'react-icons/bi'
export const Logo = () => {
  const router = useRouter()
  return (
    <>
      <Link href='/'>
        <div className='text-rose-500 flex items-center justify-center'>
          <BiBuildingHouse size={40} className='' />
          <div className='font-bold text-2xl'>Rentals Finder</div>
        </div>
      </Link>
    </>
  )
}
