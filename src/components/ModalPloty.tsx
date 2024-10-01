import React from "react";
import Modal from 'react-modal';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        height: '100%',
        width: '100%',
        bottom: 'auto',
        marginRight: '-50%',
        // position: 'relative',
        transform: 'translate(-50%, -50%)',
        zIndex: '455555555555555555555555'
    },
};

const ModalPloty = ({ children, isOpen, onRequestClose }: { children: React.ReactElement, isOpen: boolean, onRequestClose: () => void }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} className='w-full relative h-full'  >
            <button onClick={onRequestClose} className="absolute top-2 left-2  z-50">Close</button>
            {children}
        </Modal>
    )
}

export default ModalPloty;