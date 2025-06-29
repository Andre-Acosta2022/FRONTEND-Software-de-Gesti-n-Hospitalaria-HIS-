// src/presentation/pages/MedicosPage.jsx
import React, { useState } from 'react';
import { useMedicos } from '@/presentation/hooks/useMedicos';
import MedicoList from '@/presentation/components/medico/MedicoList';
import MedicoForm from '@/presentation/components/medico/MedicoForm';
import EspecialidadesPage from '@/presentation/components/medico/EspecialidadesPage';
import LoadingSpinner from '@/presentation/common/LoadingSpinner';
import Alert from '@/presentation/common/Alert';

const MedicosPage = () => {
  const { medicos, especialidades, loading, error, addMedico } = useMedicos();
  const [activeTab, setActiveTab] = useState('medicos');

  const handleSubmit = async (formData) => {
    const success = await addMedico(formData);
    if (success) {
      Alert.success('Médico registrado exitosamente');
    }
  };

  return (
    <div className="medico-container">
      <h1>Administración de Médicos</h1>
      
      <div className="medico-tab-container">
        <button 
          className={`medico-tab ${activeTab === 'medicos' ? 'active' : ''}`}
          onClick={() => setActiveTab('medicos')}
        >
          Lista de Médicos
        </button>
        <button 
          className={`medico-tab ${activeTab === 'registro' ? 'active' : ''}`}
          onClick={() => setActiveTab('registro')}
        >
          Registrar Médico
        </button>
        <button 
          className={`medico-tab ${activeTab === 'especialidades' ? 'active' : ''}`}
          onClick={() => setActiveTab('especialidades')}
        >
          Especialidades
        </button>
      </div>

      {error && <Alert type="error" message={error} />}

      <div className="medico-content">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {activeTab === 'medicos' && (
              <MedicoList medicos={medicos} />
            )}

            {activeTab === 'registro' && (
              <MedicoForm 
                especialidades={especialidades} 
                onSubmit={handleSubmit} 
              />
            )}

            {activeTab === 'especialidades' && (
              <EspecialidadesPage especialidades={especialidades} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MedicosPage;