"use client"

import React from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Filter } from 'lucide-react';

export interface FilterOptions {
  ageRange: [number, number];
  gender: string[];
  size: string[];
  type: string | null;
  location: string[];
}

interface FilterDialogProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onApply: () => void;
  onReset: () => void;
}

const FilterDialog: React.FC<FilterDialogProps> = ({
  filters,
  onFiltersChange,
  onApply,
  onReset,
}) => {
  const handleGenderChange = (gender: string) => {
    const newGenders = filters.gender.includes(gender)
      ? filters.gender.filter(g => g !== gender)
      : [...filters.gender, gender];
    onFiltersChange({ ...filters, gender: newGenders });
  };

  const handleSizeChange = (size: string) => {
    const newSizes = filters.size.includes(size)
      ? filters.size.filter(s => s !== size)
      : [...filters.size, size];
    onFiltersChange({ ...filters, size: newSizes });
  };

  const handleLocationChange = (location: string) => {
    const newLocations = filters.location.includes(location)
      ? filters.location.filter(l => l !== location)
      : [...filters.location, location];
    onFiltersChange({ ...filters, location: newLocations });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full md:w-auto"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filtros</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <h4 className="font-medium">Edad</h4>
            <Slider
              value={filters.ageRange}
              onValueChange={(value) => onFiltersChange({ ...filters, ageRange: value as [number, number] })}
              min={0}
              max={15}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{filters.ageRange[0]} años</span>
              <span>{filters.ageRange[1]} años</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Género</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="male"
                  checked={filters.gender.includes('Macho')}
                  onCheckedChange={() => handleGenderChange('Macho')}
                />
                <Label htmlFor="male">Macho</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="female"
                  checked={filters.gender.includes('Hembra')}
                  onCheckedChange={() => handleGenderChange('Hembra')}
                />
                <Label htmlFor="female">Hembra</Label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Tamaño</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="small"
                  checked={filters.size.includes('Pequeño')}
                  onCheckedChange={() => handleSizeChange('Pequeño')}
                />
                <Label htmlFor="small">Pequeño</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="medium"
                  checked={filters.size.includes('Mediano')}
                  onCheckedChange={() => handleSizeChange('Mediano')}
                />
                <Label htmlFor="medium">Mediano</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="large"
                  checked={filters.size.includes('Grande')}
                  onCheckedChange={() => handleSizeChange('Grande')}
                />
                <Label htmlFor="large">Grande</Label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Ubicación</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="location1"
                  checked={filters.location.includes('Bogotá')}
                  onCheckedChange={() => handleLocationChange('Bogotá')}
                />
                <Label htmlFor="location1">Bogotá</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="location2"
                  checked={filters.location.includes('Medellín')}
                  onCheckedChange={() => handleLocationChange('Medellín')}
                />
                <Label htmlFor="location2">Medellín</Label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onReset}>
            Limpiar
          </Button>
          <Button onClick={onApply}>Aplicar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
