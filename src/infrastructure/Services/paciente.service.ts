// src/infrastructure/Services/paciente.service.ts
const PACIENTES_API_URL = 'http://localhost:8081/api/pacientes';

interface Paciente {
  id: number;
  nombre: string;
  apellidos: string;
  edad: number;
  email: string;
  fechaNacimiento: string;
  sexo: string;
  estadoCivil: string;
  telefono: string;
  nacionalidad: string;
  direccion: {
    departamento: string;
    provincia: string;
    ciudad: string;
  };
  tipoDocumento: string;
  dni: string;
  contactoEmergencia: string;
  seguroMedico: {
    id: number;
    nombre: string;
    tipoSeguro: string;
    descripcion: string;
    cobertura: string;
  };
}

export const getPacientes = async (): Promise<Paciente[]> => {
  try {
    const response = await fetch(PACIENTES_API_URL);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching pacientes:', error);
    throw new Error('No se pudo conectar con el servidor de pacientes. Verifique su conexión o intente más tarde.');
  }
};

export const getPacienteById = async (id: number): Promise<Paciente> => {
  try {
    const response = await fetch(`${PACIENTES_API_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching paciente ${id}:`, error);
    throw error;
  }
};

export const createPaciente = async (paciente: Omit<Paciente, 'id'>): Promise<Paciente> => {
  try {
    const response = await fetch(PACIENTES_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paciente),
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating paciente:', error);
    throw error;
  }
};

export const updatePaciente = async (id: number, paciente: Partial<Paciente>): Promise<Paciente> => {
  try {
    const response = await fetch(`${PACIENTES_API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paciente),
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating paciente:', error);
    throw error;
  }
};

export const deletePaciente = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${PACIENTES_API_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting paciente:', error);
    throw error;
  }
};