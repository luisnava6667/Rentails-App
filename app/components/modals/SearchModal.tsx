'use client'

import useSearchModal from '@/app/hooks/useSearchModal'
import React, { FC, useCallback, useMemo, useState } from 'react'
import { Modal } from './Modal'
import { useRouter, useSearchParams } from 'next/navigation'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import { CountrySelect, CountrySelectValue } from '../inputs/CountrySelect'
import qs from 'query-string'
import { formatISO } from 'date-fns'


import { Counter } from '../inputs/Counter'
import { Heading } from '../Heading'
import { Calendar } from '../inputs/Calendar'

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2
}
export const SearchModal = () => {
  const router = useRouter()
  const params = useSearchParams()

  const searchModal = useSearchModal()
  const [step, setStep] = useState(STEPS.LOCATION)
  const [location, setLocation] = useState<CountrySelectValue>()
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  })
  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false
      }),
    [location]
  )
  const onBack = useCallback(() => {
    setStep((prev) => prev - 1)
  }, [])
  const onNext = useCallback(() => {
    setStep((prev) => prev + 1)
  }, [])
  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) return onNext()
    let currentQuerry = {}
    if (params) {
      currentQuerry = qs.parse(params.toString())
    }
    const updatedQuerry: any = {
      ...currentQuerry,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount
    }
    if (dateRange.startDate) {
      updatedQuerry.startDate = formatISO(dateRange.startDate)
    }
    if (dateRange.endDate) {
      updatedQuerry.endDate = formatISO(dateRange.endDate)
    }
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuerry
      },
      { skipNull: true }
    )
    setStep(STEPS.LOCATION)
    searchModal.onClose()
    router.push(url)
  }, [
    step,
    searchModal,
    router,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    onNext,
    params
  ])
  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) return 'Search'
    return 'Next'
  }, [step])
  const secunraryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) return undefined
    return 'Back'
  }, [step])
  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Where do you wanna go?'
        subtitle='Find the perfect location!'
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )
  if (step === STEPS.DATE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='When do you plan to go?'
          subtitle='Make sure everyone is free!'
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    )
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='More information' subtitle='Find your perfect place!' />
        <Counter
          title='Guests'
          subtitle='How many guests are coming'
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title='Rooms'
          subtitle='How many rooms do you need?'
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title='Bathrooms'
          subtitle='How many bathrooms do you need?'
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    )
  }
  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      secondaryActionLabel={secunraryActionLabel}
      secodaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
      title='Filters'
      actionLabel={actionLabel}
    />
  )
}
