import React from 'react';

const Modal = ({openModal, children, closeModal}) => {
    return (
       openModal && (
        <div className='modalBackground' onClick={closeModal}>
           <div className='modalContainer'>
              {children }
           </div>
        </div>
       )
    );
};

export default Modal;