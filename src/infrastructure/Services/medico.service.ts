// src/infrastructure/Services/medico.service.ts
const MEDICOS_API_URL = 'http://localhost:8082/api/medicos';
const ESPECIALIDADES_API_URL = 'http://localhost:8082/api/especialidades';

export interface Especialidad {
  id: number;
  nombre: string;
}

export interface Medico {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  especialidadId: number;
  especialidad?: Especialidad;
}

// Operaciones CRUD
export const getMedicos = async (): Promise<Medico[]> => {
  const response = await fetch(MEDICOS_API_URL);
  if (!response.ok) throw new Error('Error fetching médicos');
  return response.json();
};

export const createMedico = async (medico: Omit<Medico, 'id'>): Promise<Medico> => {
  const response = await fetch(MEDICOS_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medico)
  });
  if (!response.ok) throw new Error('Error creating médico');
  return response.json();
};

// Especialidades
export const getEspecialidades = async (): Promise<Especialidad[]> => {
  const response = await fetch(ESPECIALIDADES_API_URL);
  if (!response.ok) throw new Error('Error fetching especialidades');
  return response.json();
};