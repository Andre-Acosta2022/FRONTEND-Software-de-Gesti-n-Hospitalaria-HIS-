import React, { useEffect, useState } from 'react';
import { getClinicas, deleteClinica } from '@/infrastructure/Services/clinica.service';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';
import { FiArrowRight } from 'react-icons/fi';
import { BiLinkAlt } from 'react-icons/bi';
import '@/presentation/styles/clinica/clinicaPage.css';

const ClinicasPage = () => {
  const [clinicas, setClinicas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchClinicas = async () => {
      try {
        const clinicasData = await getClinicas();
        setClinicas(clinicasData); 
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
        setClinicas(clinicas.filter(clinica => clinica.id !== id)); 
      }
    } catch (error) {
      console.error('Error deleting clinica:', error);
    }
  };

  // Paginación
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentClinicas = clinicas.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(clinicas.length / itemsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const renderPageNumbers = () => {
    let pages = [];
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3];
      } else if (currentPage > 3 && currentPage < totalPages) {
        pages = [1, currentPage - 1, currentPage];
      }
      if (!pages.includes(totalPages)) {
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    return pages.map((page) =>
      page === 'ellipsis' ? (
        <span key="ellipsis" className="px-1">...</span>
      ) : (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`w-8 h-8 rounded transition ${currentPage === page
            ? 'bg-gray-200 font-bold'
            : 'bg-transparent'
          }`}
        >
          {page}
        </button>
      )
    );
  };

  return (
    <div className="clinicaPage">
      <h1>Listado de Sedes</h1>

      {/* Tabla de clínicas */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-sm text-gray-600">
              <th className="py-2 px-4 text-left font-medium">ID</th>
              <th className="py-2 px-4 text-left font-medium">Nombre</th>
              <th className="py-2 px-4 text-left font-medium">Dirección</th>
              <th className="py-2 px-4 text-left font-medium">Teléfono</th>
              <th className="py-2 px-4 text-left font-medium">Correo</th>
              <th className="py-2 px-4 text-left font-medium">Especialidades</th>
              <th className="py-2 px-4 text-left font-medium">Horario Atención</th>
              <th className="py-2 px-4 text-left font-medium">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {currentClinicas.map(clinica => (
              <tr key={clinica.id}>
                <td className="py-2 px-4">{clinica.id}</td>
                <td className="py-2 px-4">{clinica.nombre}</td>
                <td className="py-2 px-4">{clinica.direccion}</td>
                <td className="py-2 px-4">{clinica.telefono}</td>
                <td className="py-2 px-4">{clinica.correo}</td>
                <td className="py-2 px-4">{clinica.especialidades.join(', ')}</td>
                <td className="py-2 px-4">{clinica.horarioAtencion}</td>
                <td className="py-2 px-4">
                  <div className="flex gap-4">
                    <button className="border-2 border-orange-500 rounded p-2 text-orange-500 hover:bg-orange-50">
                      <BiLinkAlt size={14} />
                    </button>
                    <button className="border-2 border-orange-500 rounded p-2 text-orange-500 hover:bg-orange-50">
                      <FiArrowRight size={14} />
                    </button>
                    <button
                      className="border-2 border-orange-500 rounded p-2 text-orange-500 hover:bg-orange-50"
                      onClick={() => handleDelete(clinica.id)}
                    >
                      <MdDeleteOutline size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Paginador */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-4 gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="p-2 rounded bg-gray-100 text-gray-700 disabled:opacity-50"
            >
              <BsChevronLeft />
            </button>
            {renderPageNumbers()}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="p-2 rounded bg-gray-100 text-gray-700 disabled:opacity-50"
            >
              <BsChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicasPage;