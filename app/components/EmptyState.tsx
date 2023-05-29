'use client'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { Heading } from './Heading'
import { Button } from './Button'
interface EmptyStateProps {
  title?: string
  subtitle?: string
  showReset?: boolean
}
export const EmptyState: FC<EmptyStateProps> = ({
  title = 'No exact matches found',
  subtitle = 'Try searching for something else',
  showReset
}) => {
  const router = useRouter()
  return (
    <div className='flex flex-col items-center justify-center gap-2 h-[60vh]'>
      <Heading title={title} subtitle={subtitle} center />
      <div
        className='
        w-48 mt-4
      '>
        {showReset && (
          <Button
            outline
            onClick={() => router.push('/')}
            label={'Remove all filters'}
          />
        )}
      </div>
    </div>
  )
}
