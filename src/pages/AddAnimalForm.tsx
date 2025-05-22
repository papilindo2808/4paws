import AnimalAdoptionForm from "../components/animal-adoption-form";
import { PawPrint } from 'lucide-react';
import BackgroundDecorator from '../components/BackgroundDecorator';

const AnimalForm = () => {

  return (
    <div className="relative min-h-screen">
      <BackgroundDecorator />
      <div className="relative z-10 pt-50 px-4">
        <div className="max-w-3xl mx-auto pt-20">
          <div className="flex items-center justify-center gap-3 mb-8">
            <PawPrint className="w-8 h-8 text-orange-500" />
            <h1 className="text-4xl font-cabin text-orange-800">Registro de Mascota</h1>
          </div>
          <main className="container mx-auto py-10 px-4">
            <AnimalAdoptionForm />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AnimalForm;
