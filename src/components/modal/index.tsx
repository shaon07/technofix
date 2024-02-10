/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from 'flowbite-react';
import React from 'react';

type ModalContainerProps = {
    openModal: boolean;
    onClose?: (data?: any) => void,
    children: React.ReactNode;
}

export default function ModalContainer({ openModal, onClose = () => { }, children }: ModalContainerProps) {
    return (
        <div className='fixed top-0 left-0 right-0 bottom-0  bg-black bg-opacity-50 flex justify-center items-center cursor-pointer z-0' >
            <div>
                <Modal className='max-w-[500px] mx-auto' show={openModal} onClose={onClose}>
                    <Modal.Body className='p-3 mx-auto'>
                        {children}
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}
