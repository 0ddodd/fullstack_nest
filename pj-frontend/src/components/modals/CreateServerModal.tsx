import { Modal } from '@mantine/core'
import React from 'react'
import { useModal } from '../../hooks/useModal'

function CreateServerModal() {
    const {isOpen, closeModal} = useModal("CreateServer");
    return (
        <Modal opened={isOpen} onClose={closeModal}>
            Crateservermodal
        </Modal>
    )
}

export default CreateServerModal