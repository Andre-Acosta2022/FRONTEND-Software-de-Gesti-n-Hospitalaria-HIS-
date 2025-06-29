// src/hooks/useConfirmDialog.js
import { useState } from 'react';

const useConfirmDialog = () => {
  const [confirmDialog, setConfirmDialog] = useState({
    show: false,
    message: "",
    patientId: null,
  });

  const openConfirmDialog = (message, patientId) => {
    setConfirmDialog({ show: true, message, patientId });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({ show: false, message: "", patientId: null });
  };

  return {
    confirmDialog,
    openConfirmDialog,
    closeConfirmDialog,
  };
};

export default useConfirmDialog;
