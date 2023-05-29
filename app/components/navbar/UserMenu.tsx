'use client'
import { AiOutlineMenu } from 'react-icons/ai'
import { Avatar } from '../Avatar'
import { FC, useCallback, useState } from 'react'
import { MenuItem } from './MenuItem'
import { signOut } from 'next-auth/react'
import { SafeUser } from '@/app/types'
import { useRouter } from 'next/navigation'
import { useLoginModal, useRegisterModal, useRentModal } from '@/app/hooks'
interface UserMenuProps {
  currentUser?: SafeUser | null
}
export const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()
  const [isOpen, setisOpen] = useState<boolean>(false)
  const toggleOpen = useCallback(() => {
    setisOpen((isOpen) => !isOpen)
  }, [])
  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen()
    }
    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])
  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
          onClick={onRent}>
          Rent your home
        </div>
        <div
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center rounded-full gap-3 cursor-pointer hover:shadow-md transition'
          onClick={toggleOpen}>
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push('/trips')}
                  label='My trips'
                />
                <MenuItem
                  onClick={() => router.push('/favorites')}
                  label='My Favorites'
                />
                <MenuItem
                  onClick={() => router.push('/reservations')}
                  label='My Reservations'
                />
                <MenuItem
                  onClick={() => router.push('/properties')}
                  label='My Properties'
                />
                <MenuItem onClick={rentModal.onOpen} label='Rent my home' />
                <hr />
                <MenuItem onClick={() => signOut()} label='Logout' />
                <hr />
                <h2 className='cursor-text text-center uppercase shadow-md'>
                  {currentUser?.name}
                </h2>
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label='Login' />
                <MenuItem onClick={registerModal.onOpen} label='Sign up' />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
