import React from 'react'
import  ReactDOM  from 'react-dom';
import '../../../styles/components/_modal.scss'
import ButtonModal from '../../Button/ButtonModal';

interface DialogModalProps {
    onBackdropClick: () => void;
    onConfirmDelete: () => void;
}



const DialogModal: React.FC<DialogModalProps> = ({onBackdropClick, onConfirmDelete}) => {
    return ReactDOM.createPortal(
        <div onClick={onBackdropClick} className='dialogmodal__background'>
            <div className='dialogmodal__container' onClick={e => e.stopPropagation()}>
                <h1 className='dialogmodal__title'>
                Delete this message?
                </h1>
            <p className='dialogmodal__text'>
                This message will be deleted from you
            </p>
                <div className='dialogbtn__container'>
                    <ButtonModal text={'Cancel'} onClick={onBackdropClick}  styleBtn={'dialogmodalbtn'}/>
                    <ButtonModal text={'Delete'} onClick={onConfirmDelete} styleBtn={'dialogmodalbtn'}/>
                </div>
     </div>
        </div>,
   document.getElementById('modal-root')!);
}

export default DialogModal