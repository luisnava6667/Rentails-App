'use client'

import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import {useRegisterModal} from '@/app/hooks'
import { Modal } from './Modal'
import { Heading } from '../Heading'
import { Input } from '../inputs/Input'
import { toast } from 'react-hot-toast'
import { Button } from '../Button'
import { signIn } from 'next-auth/react'
import {useLoginModal} from '@/app/hooks'
export const RegisterModal = () => { 
  const regiterModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    axios
      .post('/api/register', data)
      .then(() => {
        regiterModal.onClose()
        loginModal.onOpen()
      })
      .catch((error) => {
        toast.error('Something went wrong!')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  const toggleModal = useCallback(() => {
    regiterModal.onClose()
    loginModal.onOpen()
  }, [loginModal, regiterModal])
  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome to Rentals' subtitle='Create an account!' />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='name'
        label='Name'
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
          <div>Already have an account?</div>
          <div
            className='text-neutral-500 cursor-pointer hover:underline'
            onClick={toggleModal}>
            Log in
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <Modal
      disabled={isLoading}
      isOpen={regiterModal.isOpen}
      onClose={regiterModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title='Register'
      actionLabel='Continue'
      // secondaryActionLabel='Login'
      // secodaryAction={regiterModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
