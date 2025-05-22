"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Phone, X, Users } from "lucide-react"
import { Button } from "./ui/button"

export default function LocationContactModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button 
        onClick={() => setIsOpen(true)} 
        className="bg-[#7598B6] text-white px-6 py-3 rounded-lg hover:bg-[#6487A3] transition-colors duration-200 flex items-center gap-2"
      >
        <MapPin className="h-5 w-5" />
        <span>Solicitar Adopción</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Información de Contacto</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Cerrar</span>
                </Button>
              </div>

              <div className="mt-4 space-y-4">
                {/* Información de contacto */}
                <div className="flex items-center gap-3 rounded-md border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contactar a</p>
                    <p className="text-lg font-medium">Juan Pérez</p>
                  </div>
                </div>

                {/* Ubicación */}
                <div className="flex items-center gap-3 rounded-md border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ubicación</p>
                    <p className="text-lg font-medium">Madrid, España</p>
                  </div>
                </div>

                {/* Teléfono */}
                <div className="flex items-center gap-3 rounded-md border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <a href="tel:+34912345678" className="text-lg font-medium hover:underline">
                      +34 912 345 678
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}