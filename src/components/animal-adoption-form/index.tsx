import React from "react"
import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Form } from "../../components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { PawPrint, Cat, Dog } from 'lucide-react'
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

import { BasicInfoTab } from "./basic-info-tab"
import { DetailsTab } from "./details-tab"
import { ImageTab } from "./image-tab"
import { formSchema, type FormValues } from "./form-schema"
import { useAnimal } from "../../context/AnimalContext"
import type { CreateAnimalDTO } from "../../services/animalService"

export default function AnimalAdoptionForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState("info")
  const { createAnimal } = useAnimal()
  const { user } = useAuth()
  const navigate = useNavigate()

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const getDefaultImage = (species: string) => {
    return species === 'cat' ? '/cat_profile.jpg' : '/default_profile_dog.jpg';
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      species: "dog",
      birthDate: "",
      breed: "",
      gender: "",
      location: "",
      contactPhone: "",
      adopted: false,
      description: "",
      size: "medium",
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (!user) {
        alert("Debes iniciar sesión para crear un animal")
        navigate('/login')
        return
      }

      // Crear un objeto que coincida con el DTO de creación de animal
      const animalData: CreateAnimalDTO = {
        ...data,
        imagenUrl: imagePreview || getDefaultImage(data.species),
      }

      // Si hay un archivo de imagen, lo agregamos al FormData
      if (imageFile) {
        const formData = new FormData()
        formData.append('image', imageFile)
        // Agregar cada campo del animalData al FormData
        Object.entries(animalData).forEach(([key, value]) => {
          if (key === 'adopted') {
            formData.append(key, value ? 'true' : 'false')
          } else if (value !== null && value !== undefined) {
            formData.append(key, String(value))
          }
        })
        await createAnimal(formData as unknown as CreateAnimalDTO)
      } else {
        // Si no hay imagen, enviamos solo los datos
        await createAnimal(animalData)
      }

      // Mostrar mensaje de éxito
      alert("¡Animal registrado correctamente!")

      // Limpiar el formulario después del envío exitoso
      form.reset()
      setImagePreview(null)
      setImageFile(null)
      setActiveTab("info")
    } catch (error: any) {
      console.error("Error al crear el animal:", error)
      if (error.response?.status === 403) {
        alert("No tienes permisos para crear animales. Por favor, inicia sesión con una cuenta que tenga los permisos necesarios.")
        navigate('/login')
      } else {
        alert(`Hubo un problema al registrar el animal: ${error.message || 'Error desconocido'}`)
      }
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setImageFile(file)

      // Crear una URL para la vista previa de la imagen
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setImageFile(null)
  }

  const nextTab = () => {
    if (activeTab === "info") setActiveTab("details")
    else if (activeTab === "details") setActiveTab("image")
  }

  const prevTab = () => {
    if (activeTab === "image") setActiveTab("details")
    else if (activeTab === "details") setActiveTab("info")
  }

  return (
    <Card className="w-full max-w-3xl mx-auto font-bubblegum">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <PawPrint className="w-8 h-8 text-orange-500" />
          <CardTitle className="text-3xl">Formulario de Adopción de Animales</CardTitle>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Cat className="w-5 h-5 text-gray-500" />
          <Dog className="w-5 h-5 text-gray-500" />
        </div>
        <CardDescription className="text-lg">
          Complete este formulario para registrar un animal en adopción. Proporcione información detallada para ayudar a
          encontrar el hogar perfecto.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full text-lg">
                <TabsTrigger value="info">Información Básica</TabsTrigger>
                <TabsTrigger value="details">Detalles</TabsTrigger>
                <TabsTrigger value="image">Imagen</TabsTrigger>
              </TabsList>

              {/* Sección de Información Básica */}
              <TabsContent value="info">
                <BasicInfoTab form={form} onNext={nextTab} />
              </TabsContent>

              {/* Sección de Detalles */}
              <TabsContent value="details">
                <DetailsTab form={form} onNext={nextTab} onPrev={prevTab} />
              </TabsContent>

              {/* Sección de Imagen */}
              <TabsContent value="image">
                <ImageTab
                  form={form}
                  imagePreview={imagePreview}
                  onImageUpload={handleImageUpload}
                  onRemoveImage={removeImage}
                  onPrev={prevTab}
                />
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <p className="text-sm text-muted-foreground">
          Al enviar este formulario, acepta que la información proporcionada sea utilizada para encontrar un hogar
          adecuado para el animal.
        </p>
      </CardFooter>
    </Card>
  )
}
