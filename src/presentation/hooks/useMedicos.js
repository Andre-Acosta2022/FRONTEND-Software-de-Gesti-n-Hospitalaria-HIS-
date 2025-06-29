// src/presentation/hooks/useMedicos.js
import { useState, useEffect } from 'react';
import { 
  getMedicos, 
  createMedico, 
  getEspecialidades 
} from '@/infrastructure/Services/medico.service';

export const useMedicos = () => {
  const [medicos, setMedicos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos iniciales
  const loadData = async () => {
    setLoading(true);
    try {
      const [medicosData, especialidadesData] = await Promise.all([
        getMedicos(),
        getEspecialidades()
      ]);
      setMedicos(medicosData);
      setEspecialidades(especialidadesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Registrar nuevo médico
  const addMedico = async (medicoData) => {
    try {
      const newMedico = await createMedico(medicoData);
      setMedicos(prev => [...prev, newMedico]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    medicos,
    especialidades,
    loading,
    error,
    addMedico,
    refreshData: loadData
  };
};