import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { useAnimal } from '../context/AnimalContext';
import { Animal } from '../types/Animal';
import Footer from '../components/Footer';
import FilterDialog, { FilterOptions } from '../components/filter-dialog';
import { useState } from 'react';

const AnimalCard = ({ animal }: { animal: Animal }) => {
  const navigate = useNavigate();
  const calculateAge = (birthDate: string) => {
    return new Date().getFullYear() - new Date(birthDate).getFullYear();
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={animal.imagenUrl || "/placeholder.svg"}
          alt={animal.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">{animal.name}</h3>
          <span className="px-2 py-1 text-sm rounded-full bg-[#fff8eb] text-[#f59e0b] border border-[#f59e0b]">
            {animal.species === 'dog' ? 'Perro' : animal.species === 'cat' ? 'Gato' : 'Otro'}
          </span>
        </div>
        <p className="text-gray-600 mb-2">{animal.breed}</p>
        <p className="text-gray-600 mb-4">{calculateAge(animal.birthDate)} años</p>
        <div className="flex items-center text-gray-500">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{animal.location}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => navigate(`/animal/${animal.id}`)}
          className="w-full bg-[#f59e0b] text-white hover:bg-[#e89209]"
        >
          Ver Detalles
        </Button>
      </CardFooter>
    </Card>
  );
};

const Home = () => {
  const { animals = [], loading, error } = useAnimal();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState<FilterOptions>({
    ageRange: [0, 15],
    gender: [],
    size: [],
    type: null,
    location: [],
  });

  const calculateAge = (birthDate: string) => {
    return new Date().getFullYear() - new Date(birthDate).getFullYear();
  };

  const filteredAnimals = Array.isArray(animals) ? animals.filter(animal => {
    if (!animal) return false;

    // Filtro por búsqueda
    const matchesSearch = searchTerm === '' || (
      (animal.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (animal.breed?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (animal.location?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    // Filtro por pestaña
    if (activeTab === 'dogs' && animal.species !== 'dog') return false;
    if (activeTab === 'cats' && animal.species !== 'cat') return false;
    if (activeTab === 'others' && (animal.species === 'dog' || animal.species === 'cat')) return false;

    // Filtro por edad
    const age = calculateAge(animal.birthDate);
    if (filters.ageRange[0] > 0 || filters.ageRange[1] < 15) {
      if (age < filters.ageRange[0] || age > filters.ageRange[1]) return false;
    }

    // Filtro por género
    if (filters.gender.length > 0 && animal.gender) {
      const genderMap: Record<string, string> = { 'male': 'Macho', 'female': 'Hembra' };
      const animalGender = animal.gender.toLowerCase();
      if (!filters.gender.includes(genderMap[animalGender])) return false;
    }

    // Filtro por tamaño
    if (filters.size.length > 0 && animal.size) {
      const sizeMap: Record<string, string> = { 
        'small': 'Pequeño', 
        'medium': 'Mediano', 
        'large': 'Grande' 
      };
      if (!filters.size.includes(sizeMap[animal.size])) return false;
    }

    // Filtro por ubicación
    if (filters.location.length > 0 && animal.location && !filters.location.includes(animal.location)) return false;

    return matchesSearch;
  }) : [];

  const handleResetFilters = () => {
    setSearchTerm('');
    setActiveTab('all');
    setFilters({
      ageRange: [0, 15],
      gender: [],
      size: [],
      type: null,
      location: [],
    });
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Error al cargar los animales</div>;
  }

  return (
    <div className="min-h-screen bg-[#fcfaf7]">
      <main className="container mx-auto px-4 py-30">
        <section className="mb-12">
          <div className="text-center mb-8">
            <img src="/Logo.png" alt="logo" className="w-100 h-100 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Encuentra tu Compañero Perfecto</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explora nuestra selección de animales amorosos esperando sus hogares para siempre.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Buscar por nombre, raza o ubicación..."
                  className="pl-10 border-gray-300 focus:border-[#f59e0b] focus:ring-[#f59e0b]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <FilterDialog
              filters={filters}
              onFiltersChange={setFilters}
              onApply={() => {}}
              onReset={handleResetFilters}
            />
          </div>

          {/* Mostrar filtros activos */}
          {(filters.gender.length > 0 ||
            filters.size.length > 0 ||
            filters.location.length > 0 ||
            filters.ageRange[0] > 0 ||
            filters.ageRange[1] < 15 ||
            searchTerm) && (
            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Filtros activos:</span>

                {searchTerm && (
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center">
                    Búsqueda: {searchTerm}
                  </span>
                )}

                {filters.ageRange[0] > 0 || filters.ageRange[1] < 15 ? (
                  <span className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center">
                    Edad: {filters.ageRange[0]} - {filters.ageRange[1]} años
                  </span>
                ) : null}

                {filters.gender.map((gender) => (
                  <span key={gender} className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center">
                    {gender === 'Male' ? 'Macho' : 'Hembra'}
                  </span>
                ))}

                {filters.size.map((size) => (
                  <span key={size} className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center">
                    {size === 'Small' ? 'Pequeño' : size === 'Medium' ? 'Mediano' : 'Grande'}
                  </span>
                ))}

                {filters.location.map((location) => (
                  <span key={location} className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center">
                    {location}
                  </span>
                ))}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetFilters}
                  className="text-[#f59e0b] hover:text-[#e89209] hover:bg-[#fff8eb]"
                >
                  Limpiar todo
                </Button>
              </div>
            </div>
          )}

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="dogs">Perros</TabsTrigger>
              <TabsTrigger value="cats">Gatos</TabsTrigger>
              <TabsTrigger value="others">Otros</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-6">
              {filteredAnimals.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAnimals.map((animal) => (
                    <AnimalCard key={animal.id} animal={animal} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No se encontraron animales</h3>
                  <p className="text-gray-600 mb-6">Intenta ajustar tus filtros o búsqueda.</p>
                  <Button onClick={handleResetFilters} className="bg-[#f59e0b] text-white hover:bg-[#e89209]">
                    Restablecer Filtros
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>

        <section className="bg-[#fff8eb] rounded-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué Adoptar?</h2>
              <p className="text-gray-600 mb-6">
                Cuando adoptas, salvas a un animal amoroso haciéndolo parte de tu familia y abres espacio en el refugio
                para otro animal que podría necesitarlo desesperadamente.
              </p>
              <Link to="/about-us">
                <Button className="bg-[#f59e0b] text-white hover:bg-[#e89209]">Saber Más</Button>
              </Link>
            </div>
            <div className="flex-1">
              <img
                src="/perro_familia.jpg"
                alt="Mascota adoptada feliz con su familia"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        <section className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Historias de Éxito</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Lee sobre los finales felices que nuestros animales adoptados han encontrado en sus hogares para siempre.
          </p>
          <Link to="/stories">
            <Button variant="outline" className="border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b] hover:text-white">
              Ver Todas las Historias
            </Button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

