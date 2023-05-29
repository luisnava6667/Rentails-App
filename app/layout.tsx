import './globals.css'
import { Nunito } from 'next/font/google'

import { Navbar } from './components/navbar/Navbar'
import { ClientOnly } from './components/ClientOnly'
import { RegisterModal } from './components/modals/RegisterModal'
import { ToastProvider } from './providers/ToastProvider'
import { LoginModal } from './components/modals/LoginModal'

import { RentModal } from './components/modals/RentModal'
import { SearchModal } from './components/modals/SearchModal'
import { getCurrentUser } from './actions/'
type Metadata = {
  title: string
  description: string
}
export const metadata: Metadata = {
  title: 'Rentals - App',
  description:
    'Rentals is a web application that allows you to rent properties in the Word.',

}
const font = Nunito({ subsets: ['latin'] })

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          <ToastProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className='pb-20 pt-28'>{children}</div>
      </body>
    </html>
  )
}
