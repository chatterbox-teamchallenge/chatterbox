// import React from 'react'
import '../../styles/components/_modal.scss'
import Button from '../Button/Button'



import React from 'react'
import  ReactDOM  from 'react-dom';

interface ModalProps {
    onBackdropClick: () => void;
}



const Modal: React.FC<ModalProps> = ({onBackdropClick}) => {
    return ReactDOM.createPortal(
        <div onClick={onBackdropClick} className='modal__background'>
         <div className='modal__container' onClick={e => e.stopPropagation()}>
           <p className='modal__text'>
               The letter was sent to your email address.
               <br />
               Go to confirm your account
                </p>
                <div className='btn__container'>
                <Button text={'OK'}  onClick={onBackdropClick}/>
                </div>
           
    
     </div>
        </div>,
   document.getElementById('modal-root')!);
}

export default Modal