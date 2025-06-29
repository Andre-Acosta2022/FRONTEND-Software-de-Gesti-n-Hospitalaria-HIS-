import React from 'react';
import '@/presentation/styles/common/ConfirmDialog.css';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-dialog-overlay">
            <div className="confirm-dialog">
                <h3>{title}</h3>
                <p>{message}</p>
                <div className="dialog-actions">
                    <button onClick={onCancel} className="cancel-btn">Cancelar</button>
                    <button onClick={onConfirm} className="confirm-btn">Confirmar</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;