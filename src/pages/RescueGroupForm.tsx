import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PawPrint, Camera, Upload, Trash2, Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { rescueGroupSchema, type RescueGroupFormValues } from "../lib/form-schema";
import BackgroundDecorator from "../components/BackgroundDecorator";
import { useToast } from "../hooks/use-toast";

export default function RescueGroupForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("info");

  const form = useForm<RescueGroupFormValues>({
    resolver: zodResolver(rescueGroupSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      contactPhone: "",
      email: "",
      website: "",
      imageUrl: "",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const nextTab = () => {
    if (activeTab === "info") setActiveTab("details");
    else if (activeTab === "details") setActiveTab("image");
  };

  const prevTab = () => {
    if (activeTab === "image") setActiveTab("details");
    else if (activeTab === "details") setActiveTab("info");
  };

  async function onSubmit(data: RescueGroupFormValues) {
    try {
      // TODO: Implementar la llamada a la API para crear el grupo
      console.log(data);
      toast({
        title: "Grupo creado con éxito",
        description: "El grupo de rescate ha sido creado correctamente.",
      });
      navigate("/rescue-group");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Hubo un error al crear el grupo. Por favor, inténtalo de nuevo.",
      });
    }
  }

  return (
    <div className="relative min-h-screen">
      <BackgroundDecorator />
      <div className="relative z-10 pt-50 px-4">
        <div className="max-w-3xl mx-auto pt-20">
          <Card className="w-full max-w-3xl mx-auto font-cabin">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <PawPrint className="w-8 h-8 text-orange-500" />
                <CardTitle className="text-3xl">Crear Grupo de Rescate</CardTitle>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-gray-500" />
              </div>
              <CardDescription className="text-lg">
                Complete este formulario para registrar un nuevo grupo de rescate. La información proporcionada
                ayudará a conectar con personas interesadas en adoptar.
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
                    <TabsContent value="info" className="space-y-4 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre del Grupo</FormLabel>
                              <FormControl>
                                <Input placeholder="Nombre del grupo de rescate" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ubicación</FormLabel>
                              <FormControl>
                                <Input placeholder="Ciudad, País" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="contactPhone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Teléfono de contacto</FormLabel>
                              <FormControl>
                                <Input placeholder="Ej: +34612345678" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="correo@ejemplo.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button type="button" onClick={nextTab}>
                          Siguiente
                        </Button>
                      </div>
                    </TabsContent>

                    {/* Sección de Detalles */}
                    <TabsContent value="details" className="space-y-4 pt-4">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Descripción</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe el propósito y actividades del grupo..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Incluye información sobre la misión del grupo, años de experiencia y tipos de animales que rescatan.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sitio web (opcional)</FormLabel>
                            <FormControl>
                              <Input placeholder="https://www.ejemplo.com" {...field} />
                            </FormControl>
                            <FormDescription>
                              Si tienen un sitio web o red social, inclúyelo aquí.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={prevTab}>
                          Anterior
                        </Button>
                        <Button type="button" onClick={nextTab}>
                          Siguiente
                        </Button>
                      </div>
                    </TabsContent>

                    {/* Sección de Imagen */}
                    <TabsContent value="image" className="space-y-4 pt-4">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium">Logo o imagen del grupo</h3>
                          <p className="text-sm text-muted-foreground">
                            Sube una imagen que represente a tu grupo de rescate. Puede ser un logo o una foto del equipo.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                            <Camera className="h-10 w-10 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground mb-2">
                              Arrastra y suelta o haz clic para subir una imagen
                            </p>
                            <Input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              id="image-upload"
                              onChange={handleImageUpload}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => document.getElementById("image-upload")?.click()}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Seleccionar imagen
                            </Button>
                          </div>

                          {imagePreview && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium">Imagen subida</h4>
                              <div className="relative group">
                                <img
                                  src={imagePreview}
                                  alt="Logo del grupo"
                                  className="h-60 w-full object-cover rounded-md"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={removeImage}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={prevTab}>
                          Anterior
                        </Button>
                        <Button type="submit">Crear Grupo</Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <p className="text-sm text-muted-foreground">
                Al crear un grupo de rescate, aceptas nuestros términos y condiciones y te comprometes a
                proporcionar información verídica sobre tu organización.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
} 