export interface Animal {
  id: number
  name: string
  species: "dog" | "cat"
  birthDate: string
  breed: string
  gender: string
  location: string
  adopted: boolean
  description: string
  imagenUrl: string
  size: "small" | "medium" | "large"
}

// Tipo para los datos del formulario (sin id)
export type AnimalFormData = Omit<Animal, "id" | "imagenUrl">
