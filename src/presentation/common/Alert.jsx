import React from 'react';
import '@/presentation/styles/common/Alert.css';

const Alert = ({ type, message, onClose }) => {
    return (
        <div className={`alert ${type}`}>
            <div className="alert-content">
                <span>{message}</span>
                <button onClick={onClose} className="close-btn">&times;</button>
            </div>
        </div>
    );
};

export default Alert;