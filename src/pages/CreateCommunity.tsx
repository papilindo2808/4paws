import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCommunity } from '../context/CommunityContext';

const CreateCommunity = () => {
  const navigate = useNavigate();
  const { createCommunity, error } = useCommunity();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const categories = [
    'perros',
    'gatos',
    'cuidados',
    'salud',
    'entrenamiento',
    'alimentación'
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      if (image) {
        formData.append('image', image);
      }

      await createCommunity(formData);
      navigate('/communities');
    } catch (error) {
      console.error('Error al crear la comunidad:', error);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Encabezado */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Crear Nueva Comunidad
            </h1>
            <p className="text-gray-600">
              Crea una comunidad para conectar con otros amantes de las mascotas y compartir experiencias.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
            {/* Nombre */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Comunidad
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent"
                placeholder="Escribe un nombre para tu comunidad"
                required
              />
            </div>

            {/* Descripción */}
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent min-h-[100px]"
                placeholder="Describe el propósito y temas de tu comunidad"
                required
              />
            </div>

            {/* Categoría */}
            <div className="mb-6">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent"
                required
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Imagen */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagen de la Comunidad
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex-1">
                  <div className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-center">
                    {image ? 'Cambiar imagen' : 'Seleccionar imagen'}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {image && (
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="px-4 py-2 text-red-600 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                )}
              </div>
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="max-h-64 rounded-lg object-cover"
                  />
                </div>
              )}
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/communities')}
                className="px-6 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className={`px-6 py-2 bg-[#f59e0b] text-white rounded-full hover:bg-[#e89209] transition-colors duration-200`}
              >
                Crear Comunidad
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunity;