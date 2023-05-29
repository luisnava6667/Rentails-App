'use client'

import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { signIn } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import {useRegisterModal} from '@/app/hooks/useRegisterModal'
import { Modal } from './Modal'
import { Heading } from '../Heading'
import { Input } from '../inputs/Input'
import { toast } from 'react-hot-toast'
import { Button } from '../Button'
import {useLoginModal} from '@/app/hooks'
import { useRouter } from 'next/navigation'
export const LoginModal = () => {
  const router = useRouter()
  const regiterModal = useRegisterModal()

  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    signIn('credentials', { ...data, redirect: false }).then((callback) => {
      setIsLoading(false)
      if (callback?.ok) {
        toast.success('Logged in successfully!')
        router.refresh()
        loginModal.onClose()
      }
      if (callback?.error) {
        toast.error('Something went wrong!')
      }
    })
  }
  const toggleModal = useCallback(() => {
    loginModal.onClose()
    regiterModal.onOpen()
  }, [loginModal, regiterModal])
  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome back' subtitle='Login to your account!' />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        type='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )
  const footerContent = (
    <div className='flex flex-col gap-3 mt-3'>
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className='text-neutral-500 text-center mt-4 font-light '>
        <div className='flex flex-row items-center gap-2 justify-center'>
          <div>First time using Rentals?</div>
          <div
            className='text-neutral-500 cursor-pointer hover:underline'
            onClick={toggleModal}>
            Create an account
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title='Login'
      actionLabel='Continue'
      // secondaryActionLabel='Login'
      // secodaryAction={regiterModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
