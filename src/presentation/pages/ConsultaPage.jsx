import React from 'react';
import { FaSearch } from 'react-icons/fa'; // React icons for search
import ToggleSwitch from '../components/ToggleSwitch'; // Assuming you already have this component for the toggle
import '@/presentation/styles/consulta/consulta.css';

export default function ConsultaPage() {
    return (
        <div className='consulta'>
            <h1>Crear Consulta</h1>
            <form>
                <div className='consulta__form'>
                    {/* Medico and DNI input section */}
                    <div className='consulta__input--section'>
                        <div className='consulta__input--group'>
                            <div className="input-with-icon">
                                <input type="text" id="medico" placeholder="Médico" />
                                <FaSearch />
                            </div>
                        </div>
                        <div className='consulta__input--group'>
                            <div className="input-with-icon">
                                <input type="text" id="dniPaciente" placeholder='DNI del paciente' />
                                <FaSearch />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className='consulta__textarea--group'>
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea id="descripcion" placeholder="Detalles de la consulta"></textarea>
                    </div>

                    {/* Service Section */}
                    <div className='consulta__input--group'>
                        <input type="text" id="nombreServicio" placeholder='Ingrese el nombre del servicio' />
                    </div>

                    {/* Sobre turno toggle */}
                    <div className='consulta__checkbox--group'>
                        <p>Sobre turno</p>
                        <ToggleSwitch />
                    </div>

                    {/* Doctor availability */}
                    <div className='doctor-availability'>
                        <p>Ver disponibilidad del médico</p>
                    </div>

                    {/* Observations */}
                    <div className='consulta__textarea--group'>
                        <label htmlFor="observaciones">Observaciones</label>
                        <textarea id="observaciones" placeholder="Cualquier detalle adicional"></textarea>
                    </div>

                    {/* Total and Payment Section */}
                    <div className='consulta__total--group'>
                        <div className='consulta__total--group separade'>
                            <p>Monto Total: </p>
                            <p>0,00 Sol</p>
                        </div>
                        <div>
                            <p>Pago</p>
                            <ToggleSwitch />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className='button-group'>
                        <button type="button" className='cancelar-button'>Cancelar</button>
                        <button type="submit" className='agregar-button' disabled>Agregar Consulta</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
