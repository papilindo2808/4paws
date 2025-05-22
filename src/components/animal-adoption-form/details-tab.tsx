import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Switch } from "../../components/ui/switch"
import { Button } from "../../components/ui/button"
import type { UseFormReturn } from "react-hook-form"
import type { FormValues } from "./form-schema"

interface DetailsTabProps {
  form: UseFormReturn<FormValues>
  onNext: () => void
  onPrev: () => void
}

export function DetailsTab({ form, onNext, onPrev }: DetailsTabProps) {
  return (
    <div className="space-y-4 pt-4">
      <FormField
        control={form.control}
        name="size"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tamaño</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el tamaño" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="small">Pequeño</SelectItem>
                <SelectItem value="medium">Mediano</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descripción</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describa al animal, su historia y por qué está en adopción..."
                className="min-h-[120px]"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Incluya detalles que ayuden a potenciales adoptantes a conocer mejor al animal.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="adopted"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Estado de adopción</FormLabel>
              <FormDescription>Indique si el animal ya ha sido adoptado</FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onPrev}>
          Anterior
        </Button>
        <Button type="button" onClick={onNext}>
          Siguiente
        </Button>
      </div>
    </div>
  )
}
