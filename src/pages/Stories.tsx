const Stories = () => {
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Historias de Éxito
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Tarjeta de Historia 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="/default_profile_dog.jpg" 
              alt="Historia de adopción" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Luna encuentra su hogar
              </h2>
              <p className="text-gray-600 mb-4">
                Luna fue rescatada de las calles y después de varios meses en nuestro refugio, 
                encontró una familia que la ama incondicionalmente.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span>Publicado el 15 de Marzo, 2024</span>
              </div>
            </div>
          </div>

          {/* Tarjeta de Historia 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="/cat_profile.jpg" 
              alt="Historia de adopción" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Simba y su nueva vida
              </h2>
              <p className="text-gray-600 mb-4">
                Simba llegó a nosotros con problemas de salud, pero gracias a los cuidados 
                y el amor de su nueva familia, ahora es un gato feliz y saludable.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span>Publicado el 10 de Marzo, 2024</span>
              </div>
            </div>
          </div>

          {/* Tarjeta de Historia 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="/default_profile_dog.jpg" 
              alt="Historia de adopción" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Rocky y su familia
              </h2>
              <p className="text-gray-600 mb-4">
                Rocky fue adoptado por una familia con niños pequeños. Ahora es el mejor 
                amigo y protector de los pequeños de la casa.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span>Publicado el 5 de Marzo, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories; 