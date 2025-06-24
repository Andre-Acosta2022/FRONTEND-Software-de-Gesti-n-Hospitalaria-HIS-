import React, { useEffect, useState } from 'react';
import { getClinicas, deleteClinica } from '@/infrastructure/Services/clinica.service'; // Importar los métodos del servicio
import '@/presentation/styles/clinica/clinicaPage.css';

const ClinicasPage = () => {
  const [clinicas, setClinicas] = useState([]);
  
  useEffect(() => {
    const fetchClinicas = async () => {
      try {
        const clinicasData = await getClinicas();
        setClinicas(clinicasData); // Suponiendo que la API retorna un arreglo de clínicas
      } catch (error) {
        console.error('Error fetching clinicas:', error);
      }
    };

    fetchClinicas();
  }, []);

  const handleDelete = async (id) => {
    try {
      const success = await deleteClinica(id);
      if (success) {
        setClinicas(clinicas.filter(clinica => clinica.id !== id)); // Eliminar la clínica del estado
      }
    } catch (error) {
      console.error('Error deleting clinica:', error);
    }
  };

  return (
    <div className="clinicaPage">
      <h1>Listado de Clínicas</h1>

      {/* Tabla de clínicas */}
      <table className="clinicaPage__table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Especialidades</th>
            <th>Horario Atención</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clinicas.map(clinica => (
            <tr key={clinica.id}>
              <td>{clinica.id}</td>
              <td>{clinica.nombre}</td>
              <td>{clinica.direccion}</td>
              <td>{clinica.telefono}</td>
              <td>{clinica.correo}</td>
              <td>{clinica.especialidades.join(', ')}</td> {/* Especialidades */}
              <td>{clinica.horarioAtencion}</td>
              <td>
                <button className="clinica__actions--view">Ver</button>
                <button className="clinica__actions--edit">Editar</button>
                <button
                  className="clinica__actions--delete"
                  onClick={() => handleDelete(clinica.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClinicasPage;