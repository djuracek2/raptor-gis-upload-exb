import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import '../app.css'

const AcceptModal = ({ isOpen, toggle, onYes }) => {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} zIndex="1001" id="acceptModal" className='reviewerModals'>
        <ModalHeader className='modalHeader'>Accept Data</ModalHeader>
        <ModalBody isOpen={isOpen}>
        Are you sure you want to Accept this data into the database? This change cannot be undone.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onYes}>
           Yes
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default AcceptModal
