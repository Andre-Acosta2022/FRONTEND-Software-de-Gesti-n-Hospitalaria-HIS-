import { Route, Routes } from 'react-router-dom'
import './App.css'  
import Login from './presentation/pages/LoginPage'
import MedicosPage from './presentation/pages/MedicosPage'
import AñadirMedicosPage from './presentation/components/medico/AñadirMedicosPage'
import EspecialidadesPage from './presentation/components/medico/EspecialidadesPage'
import PacientesPage from './presentation/pages/PacientesPage'
import AñadirPacientesPage from './presentation/components/pacientes/AñadirPacientesPage'
import seguromedicoPage from './presentation/components/pacientes/seguromedicoPage'
import InformesPage from './presentation/components/informes/InformesPage'
import React from 'react'
import TurnoPage from './presentation/pages/TurnoPage'

import CitasPage from './presentation/components/citas/CitasPage'
import ClinicasPage from './presentation/components/clinica/clinicaPage'
import AñadirsedePage from './presentation/components/clinica/AñadirsedePage'
import CalendarPage from './presentation/components/turno/calendarPage'
import FacturacionPage from './presentation/pages/FacturacionPage'
import Error404 from './presentation/pages/Error404Page'

import Header from '@/presentation/shared/components/header'



function App() {

  return (
    <>
        <Header />
      <Routes>
        <Route path='/' element={<Login to='/login' replace />} />
        <Route path='/login' element={<Login />} />

        {/* Demas Rutas  */}
        {/* medico */}
        <Route path='/medicos' element={<MedicosPage />} />
       <Route path='/listademedicos' element={<MedicosPage />} />
        <Route path='/anadirmedicos' element={<AñadirMedicosPage />} />
        <Route path='/especialidades' element={<EspecialidadesPage />} />
{/* paciente*/}
        <Route path='/pacientes' element={<PacientesPage />} />
        <Route path='/listadopacientes' element={<PacientesPage />} />
        <Route path='/anadirpacientes' element={<AñadirPacientesPage />} />
        <Route path='/seguromedico' element={<seguromedicoPage />} />  

       
        <Route path='/turno' element={<TurnoPage />} />
        <Route path='/calendar' element={<CalendarPage />} />
       
        <Route path='/citas' element={<CitasPage />} />
        <Route path='/facturacion' element={<FacturacionPage />} />
         <Route path='/clinica' element={<ClinicasPage />} />
        <Route path='/añadirsede' element={<AñadirsedePage />} />
        <Route path='/informes' element={<InformesPage />} />
        {/* Error 404  */}

        <Route path='*' element={<Error404 />} />
      </Routes>
    </>
  )
}

export default App
