import { useParams } from 'react-router-dom';
import { useAnimal } from '../context/AnimalContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { MapPin, Phone, Calendar, Ruler, Users, X } from 'lucide-react';
import { useState } from 'react';
import LocationContactModal from './location-contact-modal';

const AnimalDetails = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const { id } = useParams();
  const { animals } = useAnimal();

  const animal = animals.find(a => a.id === Number(id));

  if (!animal) {
    return <div className="text-center mt-8">Animal no encontrado</div>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="relative z-10 pt-50 container mx-auto px-40 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{animal.name}</CardTitle>
          <CardDescription>
            {animal.breed} - {animal.species === 'dog' ? 'Perro' : 'Gato'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={animal.imagenUrl || (animal.species === 'cat' ? '/cat_profile.jpg' : '/default_profile_dog.jpg')}
              alt={animal.name}
              className="rounded-lg object-cover w-full h-[400px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span>Fecha de nacimiento: {formatDate(animal.birthDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Ruler className="w-5 h-5 text-gray-500" />
                <span>Tamaño: {
                  animal.size === 'small' ? 'Pequeño' :
                  animal.size === 'medium' ? 'Mediano' :
                  'Grande'
                }</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-500" />
                <span>Género: {animal.gender === 'male' ? 'Macho' : 'Hembra'}</span>
              </div>
              {animal.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>Ubicación: {animal.location}</span>
                </div>
              )}
              {animal.user?.contactPhone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span>Contacto: {animal.user.contactPhone}</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Descripción</h3>
              <p className="text-gray-600">{animal.description}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          {!animal.adopted && <LocationContactModal />}
        </CardFooter>
      </Card>

      {/* Modal de Contacto */}
      {showContactModal && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowContactModal(false)}
          />
          
          {/* Modal */}
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-xl z-50 w-full max-w-md dark:bg-gray-900">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Información de Contacto</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowContactModal(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {animal.user && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 rounded-md border p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Contactar a</p>
                      <p className="text-lg font-medium">{animal.user.username}</p>
                    </div>
                  </div>

                  {animal.user.location && (
                    <div className="flex items-center gap-3 rounded-md border p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Ubicación</p>
                        <p className="text-lg font-medium">{animal.user.location}</p>
                      </div>
                    </div>
                  )}

                  {animal.user.contactPhone && (
                    <div className="flex items-center gap-3 rounded-md border p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Teléfono</p>
                        <a href={`tel:${animal.user.contactPhone}`} className="text-lg font-medium hover:underline">
                          {animal.user.contactPhone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnimalDetails;