export interface Animal {
    id: number;
    name: string;
    species: 'dog' | 'cat'; 
    birthDate: string;
    breed: string;
    gender: string;
    location: string;
    adopted: boolean;
    description: string;
    imagenUrl: string; // Nuevo atributo
    size: 'small' | 'medium' | 'large';
    user?: {
        id: number;
        username: string;
        location?: string;
        contactPhone?: string;
    };
}