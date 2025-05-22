import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PetAdopt</h3>
            <p className="text-gray-300">
              Nuestra misión es encontrar hogares amorosos para todos los animales necesitados. Únete a nosotros para hacer la diferencia.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-300 hover:text-white">
                  Donar
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contáctanos</h3>
            <p className="text-gray-300 mb-2">Email: info@petadopt.com</p>
            <p className="text-gray-300 mb-2">Teléfono: +34 123 456 789</p>
            <p className="text-gray-300">Dirección: Calle Principal 123, Madrid, España</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} PetAdopt. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
} 