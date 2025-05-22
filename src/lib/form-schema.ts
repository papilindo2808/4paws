import * as z from "zod";

export const rescueGroupSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  location: z.string().min(1, "La ubicación es requerida"),
  contactPhone: z.string().min(1, "El teléfono de contacto es requerido"),
  email: z.string().email("El email debe ser válido"),
  website: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type RescueGroupFormValues = z.infer<typeof rescueGroupSchema>; 