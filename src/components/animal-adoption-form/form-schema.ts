import { z } from "zod"

// Función para validar la edad máxima
const validateMaxAge = (date: string) => {
  const birthDate = new Date(date)
  const today = new Date()
  const age = today.getFullYear() - birthDate.getFullYear()
  return age <= 30
}

// Esquema de validación para el formulario
export const formSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  species: z.enum(["dog", "cat"], {
    required_error: "Debe seleccionar una especie",
  }),
  birthDate: z.string()
    .min(1, "La fecha de nacimiento es requerida")
    .refine(
      (date) => validateMaxAge(date),
      "La edad máxima permitida es de 30 años. Por favor, ingrese una fecha válida."
    ),
  breed: z.string().min(1, "La raza es requerida"),
  gender: z.string().min(1, "El género es requerido"),
  location: z.string().min(1, "La ubicación es requerida"),
  contactPhone: z.string()
    .min(1, "El teléfono de contacto es requerido")
    .regex(/^\+?[0-9]{6,15}$/, "El teléfono debe tener entre 6 y 15 dígitos, puede incluir un + al inicio"),
  adopted: z.boolean(),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  size: z.enum(["small", "medium", "large"], {
    required_error: "Debe seleccionar un tamaño",
  }),
})

export type FormValues = z.infer<typeof formSchema>
