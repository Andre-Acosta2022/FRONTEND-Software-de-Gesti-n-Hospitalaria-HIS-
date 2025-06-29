// components/LoadingSpinner.jsx
import React from 'react';
import '@/presentation/styles/common/LoadingSpinner.css'; // Este archivo contiene el estilo para el spinner

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
