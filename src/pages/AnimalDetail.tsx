import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Heart, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../context/AuthContext';
import { useAnimal } from '../context/AnimalContext';
import { Animal } from '../types/Animal';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

const AnimalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { animals, loading, error, getSimilarAnimals } = useAnimal();
  const [selectedImage, setSelectedImage] = useState(0);
  const [similarAnimals, setSimilarAnimals] = useState<Animal[]>([]);
  const [loadingSimilar, setLoadingSimilar] = useState(true);

  const animal = animals.find(a => a.id.toString() === id);

  useEffect(() => {
    const fetchSimilarAnimals = async () => {
      if (id) {
        try {
          setLoadingSimilar(true);
          const similar = await getSimilarAnimals(parseInt(id));
          setSimilarAnimals(similar);
        } catch (error) {
          console.error('Error al cargar animales similares:', error);
        } finally {
          setLoadingSimilar(false);
        }
      }
    };

    fetchSimilarAnimals();
  }, [id, getSimilarAnimals]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }

  if (error || !animal) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Error al cargar el animal</div>;
  }

  const calculateAge = (birthDate: string) => {
    return new Date().getFullYear() - new Date(birthDate).getFullYear();
  };


  return (
    <div className="min-h-screen bg-[#fcfaf7]">
      <main className="container mx-auto px-4 py-20">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-[#f59e0b] hover:underline">
            <ArrowLeft size={16} className="mr-2" />
            Volver a todos los animales
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="relative h-[400px] w-full">
                <img
                  src={animal.imagenUrl || "/placeholder.svg"}
                  alt={animal.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex justify-between">
                <div className="flex space-x-2">
                  {[animal.imagenUrl, "/placeholder.svg", "/placeholder.svg"].map((image, index) => (
                    <div
                      key={index}
                      className={`h-16 w-16 relative rounded overflow-hidden cursor-pointer ${
                        index === selectedImage ? "ring-2 ring-[#f59e0b]" : ""
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${animal.name} foto ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Heart size={18} />
                    <span className="sr-only">Agregar a favoritos</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 size={18} />
                    <span className="sr-only">Compartir</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <Tabs defaultValue="about">
                <TabsList className="mb-4">
                  <TabsTrigger value="about">Acerca de</TabsTrigger>
                  <TabsTrigger value="details">Detalles</TabsTrigger>
                  <TabsTrigger value="shelter">Información del Refugio</TabsTrigger>
                </TabsList>
                <TabsContent value="about" className="space-y-4">
                  <h3 className="text-xl font-semibold">Acerca de {animal.name}</h3>
                  <p className="text-gray-600">{animal.description || "Este adorable animal está buscando un hogar para siempre."}</p>
                  <div>
                    <h4 className="font-medium mb-2">Personalidad</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Amigable', 'Juguetón', 'Cariñoso', 'Activo', 'Leal'].map((trait, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#fff8eb] text-[#f59e0b] rounded-full text-sm font-medium"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="details" className="space-y-4">
                  <h3 className="text-xl font-semibold">Salud y Cuidados</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-2 bg-green-500"></div>
                      <span>Vacunado</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-2 bg-green-500"></div>
                      <span>Esterilizado</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-2 bg-green-500"></div>
                      <span>Microchip</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-2 bg-green-500"></div>
                      <span>Sin necesidades especiales</span>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="shelter" className="space-y-4">
                  <h3 className="text-xl font-semibold">Refugio de Animales</h3>
                  <p className="text-gray-600">
                    Este animal está actualmente bajo el cuidado de nuestro refugio. Por favor, contacta directamente con el refugio
                    para obtener más información sobre el proceso de adopción.
                  </p>
                  <div className="space-y-2">
                    <p className="flex items-center">
                      <span className="font-medium mr-2">Teléfono:</span> +34 123 456 789
                    </p>
                    <p className="flex items-center">
                      <span className="font-medium mr-2">Email:</span> info@refugio.com
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-2xl font-bold mb-4">{animal.name}</h2>
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-2 text-[#f59e0b]" />
                  <span>{animal.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar size={18} className="mr-2 text-[#f59e0b]" />
                  <span>{calculateAge(animal.birthDate)} años</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Tipo</p>
                    <p className="font-medium">{animal.species === 'dog' ? 'Perro' : animal.species === 'cat' ? 'Gato' : 'Otro'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Raza</p>
                    <p className="font-medium">{animal.breed}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Género</p>
                    <p className="font-medium">{animal.gender === 'male' ? 'Macho' : 'Hembra'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Tamaño</p>
                    <p className="font-medium">{animal.size}</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => user ? navigate('/adopt') : navigate('/login')}
                className="w-full bg-[#f59e0b] text-white hover:bg-[#e89209]"
              >
                ¡Adoptar!
              </Button>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>ID: #{animal.id}</p>
                <p>Listado el: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        <section className="my-12">
          <h2 className="text-2xl font-bold mb-6">También te podría interesar</h2>
          {loadingSimilar ? (
            <div className="text-center py-4">Cargando animales similares...</div>
          ) : similarAnimals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarAnimals.map((similarAnimal) => (
                <div key={similarAnimal.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="relative h-48 w-full">
                    <img
                      src={similarAnimal.imagenUrl || "/placeholder.svg"}
                      alt={similarAnimal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">{similarAnimal.name}</h3>
                    <p className="text-sm text-gray-600">{similarAnimal.breed} • {calculateAge(similarAnimal.birthDate)} años</p>
                    <Button
                      onClick={() => navigate(`/animal/${similarAnimal.id}`)}
                      className="w-full mt-2 bg-[#f59e0b] text-white hover:bg-[#e89209]"
                    >
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">No hay animales similares disponibles</div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AnimalDetail;