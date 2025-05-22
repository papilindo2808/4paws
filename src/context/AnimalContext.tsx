import React, { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import animalService, { CreateAnimalDTO, PutForAdoptionDTO } from '../services/animalService';
import { Animal } from '../types/Animal';

interface AnimalContextProps {
    animals: Animal[];
    error: string | null;
    loading: boolean;
    createAnimal: (data: CreateAnimalDTO) => Promise<Animal>;
    putForAdoption: (data: PutForAdoptionDTO) => Promise<Animal>;
    updateAnimal: (id: number, data: Partial<Animal>) => Promise<Animal>;
    deleteAnimal: (id: number) => Promise<void>;
    getSimilarAnimals: (id: number) => Promise<Animal[]>;
}

const AnimalContext = createContext<AnimalContextProps | undefined>(undefined);

export const AnimalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const queryClient = useQueryClient();

    // Query para obtener todos los animales
    const { data: animals = [], error, isLoading } = useQuery<Animal[], Error>({
        queryKey: ['animals'],
        queryFn: animalService.getAll,
    });

    // Mutación para crear un animal
    const createAnimalMutation = useMutation({
        mutationFn: animalService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['animals'] });
        },
    });

    // Mutación para poner en adopción
    const putForAdoptionMutation = useMutation({
        mutationFn: animalService.putForAdoption,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['animals'] });
        },
    });

    // Mutación para actualizar un animal
    const updateAnimalMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Animal> }) =>
            animalService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['animals'] });
        },
    });

    // Mutación para eliminar un animal
    const deleteAnimalMutation = useMutation({
        mutationFn: animalService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['animals'] });
        },
    });

    const value = {
        animals,
        error: error?.message || null,
        loading: isLoading,
        createAnimal: createAnimalMutation.mutateAsync,
        putForAdoption: putForAdoptionMutation.mutateAsync,
        updateAnimal: (id: number, data: Partial<Animal>) =>
            updateAnimalMutation.mutateAsync({ id, data }),
        deleteAnimal: deleteAnimalMutation.mutateAsync,
        getSimilarAnimals: animalService.getSimilarAnimals,
    };

    return <AnimalContext.Provider value={value}>{children}</AnimalContext.Provider>;
};

export const useAnimal = () => {
    const context = useContext(AnimalContext);
    if (context === undefined) {
        throw new Error('useAnimal debe ser usado dentro de un AnimalProvider');
    }
    return context;
};
