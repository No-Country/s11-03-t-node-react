import Image from 'next/image'
import styles from './page.module.css'
import NavBar from './home/navBar'
import NuestrasCaracteristicas from './home/nuestrasCaracteristicas'
import NuestroTeam from './home/nuestroTeam'
import { Reviews } from './components/reviews/page'

export default function Home() {
  return (
    <main >
      <NuestrasCaracteristicas /> 
      <NuestroTeam />
      <Reviews/>
    </main>
  )
}
