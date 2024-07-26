import React from 'react';
import DialogModal from './DialogModal';

interface DialogWrapperProps {
    isModalVisible: boolean;
    onBackdropClick: () => void;
    confirmDelete: () => void; 
  }
  
  const DialogWrapper: React.FC<DialogWrapperProps> = ({ isModalVisible, onBackdropClick, confirmDelete }) => {
    if (!isModalVisible) {
      return null;
    }
  
    return (      
          <DialogModal onBackdropClick={onBackdropClick} onConfirmDelete={confirmDelete} />
    );
};  
  
export default DialogWrapper