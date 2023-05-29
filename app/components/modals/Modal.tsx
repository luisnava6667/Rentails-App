'use client'
import { FC, ReactElement, useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { Button } from '../Button'

interface ModalProps {
  isOpen?: boolean
  onClose: () => void
  onSubmit: () => void
  title?: string
  body?: ReactElement
  footer?: ReactElement
  actionLabel: string
  disabled?: boolean
  secodaryAction?: () => void
  secondaryActionLabel?: string
}
export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secodaryAction,
  secondaryActionLabel
}) => {
  const [shoModal, setShoModal] = useState(isOpen)
  useEffect(() => setShoModal(isOpen), [isOpen])
  const handleClose = useCallback(() => {
    if (disabled) return
    setShoModal(false)
    setTimeout(() => onClose(), 300)
  }, [disabled, onClose])
  const handleSubmit = useCallback(() => {
    if (disabled) return
    onSubmit()
  }, [disabled, onSubmit])
  const hanldeSecodaryAction = useCallback(() => {
    if (disabled || !secodaryAction) return
    secodaryAction()
  }, [disabled, secodaryAction])
  if (!isOpen) return null
  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 '>
        <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 mx-auto h-full lg:h-auto md:h-auto'>
          {/* Content */}
          <div
            className={`
                translate duration-300 h-full ${
                  shoModal ? 'translate-y-0' : 'translate-y-full'
                } 
                ${shoModal ? 'opacity-100' : 'opacity-0'} 
            `}>
            <div className='translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
              {/* Header */}
              <div className='flex items-center rounded-t p-6 justify-center relative border-b-[1px]'>
                <button className='p-1 border-0 hover:opacity-70 transition absolute left-9 '>
                  <IoMdClose size={18} onClick={handleClose} />
                </button>
                <div className='text-lg font-sem'>{title}</div>
              </div>
              {/* Body */}
              <div className='relative p-6 flex-auto'>{body}</div>
              {/* Footer */}
              <div className='flex flex-col gap-2 p-6 '>
                <div className='flex flex-row items-center gap-4 w-full'>
                  {secodaryAction && secondaryActionLabel && (
                    <Button
                      outline
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={hanldeSecodaryAction}
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
