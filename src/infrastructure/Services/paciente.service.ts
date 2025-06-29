import axiosPaciente from '@/infrastructure/Config/axiosPaciente';  // La instancia de Axios

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
    const response = await axiosPaciente.get('');  // Usamos Axios para obtener pacientes
    return response.data;
  } catch (error) {
    console.error('Error fetching pacientes:', error);
    throw new Error('No se pudo conectar con el servidor de pacientes. Verifique su conexión o intente más tarde.');
  }
};

export const getPacienteById = async (id: number): Promise<Paciente> => {
  try {
    const response = await axiosPaciente.get(`/${id}`);  // Usamos Axios para obtener un paciente por ID
    return response.data;
  } catch (error) {
    console.error(`Error fetching paciente ${id}:`, error);
    throw error;
  }
};

export const createPaciente = async (paciente: Omit<Paciente, 'id'>): Promise<Paciente> => {
  try {
    const response = await axiosPaciente.post('/', paciente);  // Usamos Axios para crear un paciente
    return response.data;
  } catch (error) {
    console.error('Error creating paciente:', error);
    throw error;
  }
};

export const updatePaciente = async (id: number, paciente: Partial<Paciente>): Promise<Paciente> => {
  try {
    const response = await axiosPaciente.put(`/${id}`, paciente);  // Usamos Axios para actualizar un paciente
    return response.data;
  } catch (error) {
    console.error('Error updating paciente:', error);
    throw error;
  }
};

export const deletePaciente = async (id: number): Promise<boolean> => {
  try {
    const response = await axiosPaciente.delete(`/${id}`);  // Usamos Axios para eliminar un paciente
    return response.status === 200;
  } catch (error) {
    console.error('Error deleting paciente:', error);
    throw error;
  }
};
