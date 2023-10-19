import NuestrasCaracteristicas from "./home/nuestrasCaracteristicas";
import NuestroTeam from "./home/nuestroTeam";
import AgendarTurnoSection from "./home/agendarTurno/agendarTurnoSection";
import Mascotas from "./home/mascotas/mascotas";
import SobreNosotros from "./home/sobrenosostros/sobreNosotros";
import NuestrosServicios from "./home/nuestrosServicios";
import Contacto from "./home/contacto/contacto";
import GaleriaProductos from "./home/galeriaProductos";
import Footer from "./components/footer/footer";
import Reviews from "./components/reviews/page";

export default function Home() {
  return (
    <main>
      <AgendarTurnoSection />
      <Mascotas />
      <SobreNosotros />
      <NuestrosServicios />
      <NuestrasCaracteristicas />
      <NuestroTeam />
      <Reviews />
      <GaleriaProductos />
      <Contacto />
      <Footer />
    </main>
  );
}
