"use client"

import type React from "react"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Camera, Trash2, Upload } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"
import type { FormValues } from "./form-schema"

interface ImageTabProps {
  form: UseFormReturn<FormValues>
  imagePreview: string | null
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveImage: () => void
  onPrev: () => void
}

export function ImageTab({ imagePreview, onImageUpload, onRemoveImage, onPrev }: ImageTabProps) {
  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Imagen del animal</h3>
          <p className="text-sm text-muted-foreground">
            Sube una foto clara que muestre bien al animal. Las buenas fotos aumentan las posibilidades de adopción.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
            <Camera className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Arrastra y suelta o haz clic para subir una foto</p>
            <Input type="file" accept="image/*" className="hidden" id="image-upload" onChange={onImageUpload} />
            <Button type="button" variant="outline" onClick={() => document.getElementById("image-upload")?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Seleccionar foto
            </Button>
          </div>

          {imagePreview && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Imagen subida</h4>
              <div className="relative group">
                <img
                  src={imagePreview}
                  alt="Foto del animal"
                  className="h-60 w-full object-cover rounded-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={onRemoveImage}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrev}>
          Anterior
        </Button>
        <Button type="submit" className="bg-orange-500 text-white hover:bg-orange-600">
          Registrar Animal
        </Button>
      </div>
    </div>
  )
}
