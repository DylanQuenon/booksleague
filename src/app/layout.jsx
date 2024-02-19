import { Montserrat } from 'next/font/google'
import './globals.scss'
import NavBar from '../../Components/NavBar'
import Footer from '../../Components/Footer'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: {
      default: 'BooksLeague',
      template: '%s | BooksLeague'
  },
  description: 'Les meilleurs livres de foot dans votre bibliothèque !'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <NavBar />
        
        {children}
      
      <Footer/>
      </body>
    </html>
  )
}
