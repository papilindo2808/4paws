import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Animal } from '../types/Animal';

interface AnimalListProps {
  animals: Animal[];
  title: string;
  description: string;
  species: 'cat' | 'dog';
}

const AnimalList = ({ animals, title, description, species }: AnimalListProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getDefaultImage = (species: string) => {
    return species === 'cat' ? '/cat_profile.jpg' : '/default_profile_dog.jpg';
  };

  const handleButtonClick = () => {
    if (user) {
      navigate('/add-animal');
    } else {
      navigate('/login');
    }
  };

  const handleAdoptClick = (id: number) => {
    navigate(`/animal/${id}`);
  };

  const filteredAnimals = animals.filter((animal) => animal.species === species);

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
        <button
          onClick={handleButtonClick}
          className="bg-[#7598B6] text-white px-4 py-2 rounded-lg hover:bg-[#6487A3] shadow-md transition-colors duration-200"
        >
          Poner en Adopción
        </button>
      </div>
      <p className="text-center text-gray-700 mb-8">{description}</p>
      <section>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnimals.map((animal) => {
            const age = animal.birthDate
              ? `${new Date().getFullYear() - new Date(animal.birthDate).getFullYear()} años`
              : 'Desconocida';
            return (
              <li
                key={animal.id}
                className={`p-4 border rounded-lg shadow-md bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-[#6487A3]/10 ${
                  animal.adopted ? 'bg-gray-300' : ''
                }`}
                onClick={() => navigate(`/animal/${animal.id}`)}
              >
                <div className="flex flex-col items-center">
                  <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={animal.imagenUrl || getDefaultImage(animal.species)}
                      alt={`Foto de ${animal.name}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = getDefaultImage(animal.species);
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{animal.name}</h3>
                  {!animal.adopted && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAdoptClick(animal.id);
                      }}
                      className="mt-4 bg-[#7598B6] text-white px-4 py-2 rounded-lg hover:bg-[#6487A3] transition-colors duration-200"
                    >
                      Ver Detalles
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default AnimalList; 