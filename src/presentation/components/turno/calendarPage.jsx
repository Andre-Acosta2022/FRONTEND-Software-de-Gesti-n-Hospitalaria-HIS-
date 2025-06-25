import React, { useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import '@/presentation/styles/turno/calendar.css';

const CalendarPage = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  // Función para obtener los días del mes
  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  // Función para obtener el nombre del mes
  const getMonthName = (month) => {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[month];
  };

  // Cambiar mes
  const handleMonthChange = (direction) => {
    if (direction === 'prev') {
      setMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
      if (month === 0) setYear((prevYear) => prevYear - 1);
    } else if (direction === 'next') {
      setMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
      if (month === 11) setYear((prevYear) => prevYear + 1);
    }
  };

  // Filtro por semana (por simplicidad aquí lo implementamos como una vista de cada semana dentro del mes)
  const getWeeks = (days) => {
    let weeks = [];
    let week = [];
    days.forEach((day) => {
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
      week.push(day);
    });
    if (week.length) weeks.push(week); // Agregar la última semana
    return weeks;
  };

  const daysInMonth = getDaysInMonth(month, year);
  const weeks = getWeeks(daysInMonth);

  return (
    <div className="calendar-container">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {getMonthName(month)} {year}
        </h2>
        <div className="flex gap-4">
          <button
            className="p-2 rounded bg-gray-100 text-gray-700"
            onClick={() => handleMonthChange('prev')}
          >
            <BsChevronLeft />
          </button>
          <button
            className="p-2 rounded bg-gray-100 text-gray-700"
            onClick={() => handleMonthChange('next')}
          >
            <BsChevronRight />
          </button>
        </div>
      </div>

      {/* Calendario de semanas */}
      <div className="grid grid-cols-7 text-center mb-4">
        <div className="font-medium">Dom</div>
        <div className="font-medium">Lun</div>
        <div className="font-medium">Mar</div>
        <div className="font-medium">Mié</div>
        <div className="font-medium">Jue</div>
        <div className="font-medium">Vie</div>
        <div className="font-medium">Sáb</div>
      </div>

      {/* Mostrar semanas */}
      <div>
        {weeks.map((week, index) => (
          <div key={index} className="grid grid-cols-7 gap-1 mb-2">
            {week.map((day) => (
              <div
                key={day.getDate()}
                className={`p-2 rounded cursor-pointer ${
                  day.toDateString() === selectedDate.toDateString()
                    ? 'bg-blue-500 text-white'
                    : 'bg-transparent text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedDate(day)}
              >
                {day.getDate()}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Filtro por semana, mes y año */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <label className="mr-2">Mes:</label>
          <select
            className="border rounded px-2 py-1"
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {getMonthName(i)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <label className="mr-2">Año:</label>
          <select
            className="border rounded px-2 py-1"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={year - 5 + i}>
                {year - 5 + i}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
