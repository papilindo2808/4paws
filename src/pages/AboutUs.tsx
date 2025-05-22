import { Heart, PawPrint, Shield } from 'lucide-react';
import BackgroundDecorator from '../components/BackgroundDecorator';

const AboutUs = () => {
  return (
    <div className="relative min-h-screen">
      <BackgroundDecorator />
      <main className="relative z-10 p-8">
        <div className="max-w-4xl mx-auto pt-30">
          <h1 className="font-cabin text-5xl md:text-7xl text-center mb-12 text-orange-800">
            Sobre Nosotros
          </h1>
          
          <div className="space-y-8">
            {/* Sección de Misión */}
            <div className="bg-white p-8 rounded-xl shadow-md border-2 border-orange-200">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="text-orange-500 w-8 h-8" />
                <h2 className="font-bubblegum text-3xl text-orange-600">Nuestra Misión</h2>
              </div>
              <p className="font-inter text-gray-700 leading-relaxed">
                En 4Paws, nos dedicamos a crear conexiones significativas entre animales necesitados y familias amorosas. 
                Nuestra misión es facilitar el proceso de adopción y asegurar que cada mascota encuentre un hogar donde pueda prosperar.
              </p>
            </div>

            {/* Sección ¿Por qué Adoptar? */}
            <div className="bg-white p-8 rounded-xl shadow-md border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <PawPrint className="text-blue-500 w-8 h-8" />
                <h2 className="font-bubblegum text-3xl text-blue-600">¿Por qué Adoptar?</h2>
              </div>
              <ul className="font-indie text-lg space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <PawPrint className="text-blue-400 w-5 h-5 flex-shrink-0" />
                  <span>Das una segunda oportunidad a un animal necesitado</span>
                </li>
                <li className="flex items-center gap-2">
                  <PawPrint className="text-blue-400 w-5 h-5 flex-shrink-0" />
                  <span>Contribuyes a reducir la sobrepoblación de animales</span>
                </li>
                <li className="flex items-center gap-2">
                  <PawPrint className="text-blue-400 w-5 h-5 flex-shrink-0" />
                  <span>Recibes amor incondicional y compañía</span>
                </li>
                <li className="flex items-center gap-2">
                  <PawPrint className="text-blue-400 w-5 h-5 flex-shrink-0" />
                  <span>Ayudas a crear una comunidad más compasiva</span>
                </li>
              </ul>
            </div>

            {/* Sección de Compromiso */}
            <div className="bg-white p-8 rounded-xl shadow-md border-2 border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-green-500 w-8 h-8" />
                <h2 className="font-bubblegum text-3xl text-green-600">Nuestro Compromiso</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-indie text-xl text-green-800 mb-2">Adopciones Responsables</h3>
                    <p className="font-inter text-sm text-gray-600">
                      Facilitamos procesos de adopción seguros y responsables
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-indie text-xl text-green-800 mb-2">Apoyo Continuo</h3>
                    <p className="font-inter text-sm text-gray-600">
                      Brindamos soporte post-adopción para asegurar una transición exitosa
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-indie text-xl text-green-800 mb-2">Refugios Confiables</h3>
                    <p className="font-inter text-sm text-gray-600">
                      Trabajamos con refugios y grupos de rescate verificados
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-indie text-xl text-green-800 mb-2">Bienestar Animal</h3>
                    <p className="font-inter text-sm text-gray-600">
                      Promovemos el bienestar animal en nuestra comunidad
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
