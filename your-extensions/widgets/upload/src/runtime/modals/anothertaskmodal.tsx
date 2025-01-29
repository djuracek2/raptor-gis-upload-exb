import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'jimu-ui'
import '../app.css'

const AnotherTaskModal = ({ isOpen, toggle, raptorCloseTask }) => {
  return (
    <div className='d-flex justify-content-around'>
      <Modal isOpen={isOpen} toggle={toggle} backdrop='static' zIndex="1001" id="taskModal" className='reviewerModals'>
        <ModalHeader className='modalHeader'>Task Needed</ModalHeader>
        <ModalBody isOpen={isOpen} style={{ fontSize: '15px', fontWeight: '600' }}>
        Is another Report on Localities needed?
        </ModalBody>
        <ModalFooter>
          <Button size="lg" color="primary" className='btn btn-primary' toggle={toggle} onClick={() => raptorCloseTask(true)}>
           Yes
          </Button>{' '}
          <Button size="lg" color="secondary" className='btn btn-primary' toggle={toggle} onClick={() => raptorCloseTask(false)}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default AnotherTaskModal
