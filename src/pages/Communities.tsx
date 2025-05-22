import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCommunity } from '../context/CommunityContext';

const Communities = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const { communities, loading, error, getAllCommunities, getCommunitiesByCategory } = useCommunity();

  const categories = [
    'todas',
    'perros',
    'gatos',
    'cuidados',
    'salud',
    'entrenamiento',
    'alimentación'
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        if (selectedCategory === 'todas') {
          await getAllCommunities();
        } else {
          await getCommunitiesByCategory(selectedCategory);
        }
      } catch (error) {
        console.error('Error al cargar comunidades:', error);
      }
    };

    loadData();
  }, [selectedCategory]);

  const filteredCommunities = selectedCategory === 'todas' 
    ? communities 
    : communities.filter(community => community.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f59e0b] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando comunidades...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error al cargar las comunidades: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Comunidades
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Únete a nuestras comunidades y comparte experiencias, consejos y momentos especiales con otros amantes de las mascotas.
          </p>
        </div>

        {/* Filtros de categoría */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-[#f59e0b] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid de comunidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCommunities.map((community) => (
            <Link 
              key={community.id} 
              to={`/community/${community.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div className="relative h-48">
                <img
                  src={community.imageUrl || '/default_profile_dog.jpg'}
                  alt={community.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                  {community.members} miembros
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {community.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {community.description}
                </p>
                <button className="w-full px-4 py-2 bg-[#f59e0b] text-white rounded-full hover:bg-[#e89209] transition-colors duration-200">
                  Unirse
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Botón para crear comunidad */}
        <div className="text-center mt-12">
          <button 
            onClick={() => navigate('/create-community')}
            className="px-8 py-3 bg-[#f59e0b] text-white rounded-full hover:bg-[#e89209] transition-colors duration-200 font-medium"
          >
            Crear Nueva Comunidad
          </button>
        </div>
      </div>
    </div>
  );
};

export default Communities; 