import { Montserrat } from 'next/font/google'
import './globals.scss'
import NavBar from '../../Components/NavBar'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'BooksLeague',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <main>
        <NavBar />
        {children}
        </main>
      
      </body>
    </html>
  )
}
