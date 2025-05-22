import axiosClient from '../utils/axiosClient';
import { Animal } from '../types/Animal';

export interface CreateAnimalDTO {
    name: string;
    species: 'dog' | 'cat';
    breed: string;
    description: string;
    birthDate: string;
    gender: string;
    adopted: boolean;
    imagenUrl: string;
    size: 'small' | 'medium' | 'large';
    location: string;
    contactPhone: string;
}

export interface PutForAdoptionDTO {
    userId: number;
    animal: CreateAnimalDTO;
    reason: string;
    location: string;
    contactPhone: string;
}

const animalService = {
    // Obtener todos los animales
    getAll: async (): Promise<Animal[]> => {
        console.log('Obteniendo todos los animales...');
        const response = await axiosClient.get('/api/animals');
        console.log('Respuesta del servidor:', response.data);
        return response.data;
    },

    // Obtener un animal por ID
    getById: async (id: number): Promise<Animal> => {
        const response = await axiosClient.get(`/api/animals/${id}`);
        return response.data;
    },

    // Crear un nuevo animal
    create: async (animalData: CreateAnimalDTO | FormData): Promise<Animal> => {
        let config;
        let data;

        if (animalData instanceof FormData) {
            // Si es FormData, extraer la imagen y los datos del animal
            const image = animalData.get('image') as File;
            const animalInfo = {
                name: animalData.get('name'),
                species: animalData.get('species'),
                breed: animalData.get('breed'),
                description: animalData.get('description'),
                birthDate: animalData.get('birthDate'),
                gender: animalData.get('gender'),
                adopted: animalData.get('adopted') === 'true',
                size: animalData.get('size'),
                location: animalData.get('location'),
                contactPhone: animalData.get('contactPhone')
            };

            // Crear un nuevo FormData con la estructura correcta
            const formData = new FormData();
            formData.append('image', image);
            Object.entries(animalInfo).forEach(([key, value]) => {
                formData.append(key, value as string);
            });

            config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            data = formData;
        } else {
            config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            data = animalData;
        }
            
        const response = await axiosClient.post('/api/animals', data, config);
        return response.data;
    },

    // Poner un animal en adopción
    putForAdoption: async (data: PutForAdoptionDTO): Promise<Animal> => {
        const response = await axiosClient.post('/api/animals/put-for-adoption', data);
        return response.data;
    },

    // Actualizar un animal
    update: async (id: number, animalData: Partial<Animal>): Promise<Animal> => {
        const response = await axiosClient.put(`/api/animals/${id}`, animalData);
        return response.data;
    },

    // Eliminar un animal
    delete: async (id: number): Promise<void> => {
        await axiosClient.delete(`/api/animals/${id}`);
    },

    // Obtener animales similares
    getSimilarAnimals: async (id: number): Promise<Animal[]> => {
        try {
            const response = await axiosClient.get(`/api/animals/${id}/similar`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener animales similares:', error);
            // Si hay un error, retornar un array vacío en lugar de propagar el error
            return [];
        }
    }
};

export default animalService; 