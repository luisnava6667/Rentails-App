'use client'
import { FC, useEffect, useState } from 'react'
interface ClientOnlyProps {
  children: React.ReactNode
}
export const ClientOnly: FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => setHasMounted(true), [])
  if (!hasMounted) return null
  return <> {children} </>
}

