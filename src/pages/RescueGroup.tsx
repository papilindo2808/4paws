import React, { useEffect } from 'react';
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useRescueGroup } from '../context/RescueGroupContext';
import { useAuth } from '../context/AuthContext';

const RescueGroup = () => {
  const navigate = useNavigate();
  const { rescueGroups, loading, error, refetchRescueGroups } = useRescueGroup();
  const { user } = useAuth();

  useEffect(() => {
    refetchRescueGroups();
  }, [refetchRescueGroups]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Error al cargar los grupos de rescate</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Grupos de Rescate</h1>
        {user && (
          <Button
            onClick={() => navigate("/rescue-group-form")}
            className="bg-[#7598B6] text-white px-6 py-3 rounded-lg hover:bg-[#6487A3] transition-colors duration-200"
          >
            Crear Grupo
          </Button>
        )}
      </div>
      <div className="max-w-6xl mx-auto pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rescueGroups.map((group) => (
            <div key={group.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3">{group.name}</h2>
              <p className="text-gray-600 mb-2">📍 {group.location}</p>
              <p className="text-gray-700 mb-4">{group.description}</p>
              <div className="border-t pt-4">
                <p className="text-gray-600">✉️ {group.contact || 'No disponible'}</p>
                <p className="text-gray-600">📞 {group.phone || 'No disponible'}</p>
              </div>
              <button className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                Contactar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RescueGroup;
