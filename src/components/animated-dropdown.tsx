import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "./ui/button"

export default function AnimatedDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative w-full max-w-xs">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className="w-full justify-between"
        aria-expanded={isOpen}
        aria-controls="dropdown-content"
      >
        <span>Haz clic aquí</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="dropdown-content"
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute z-10 mt-2 w-full rounded-md border bg-white p-4 shadow-md dark:border-gray-800 dark:bg-gray-950"
          >
            {/* Aquí puedes añadir tu contenido */}
            <p className="text-sm text-gray-500">Añade tu información aquí...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
