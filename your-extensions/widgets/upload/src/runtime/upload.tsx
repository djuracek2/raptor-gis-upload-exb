import React from 'react'
import { FormGroup, Input } from 'jimu-ui'
import Loader from './loader'

const UploadFile = ({ handleFileChange, message, messageClass, isUploading }) => {
  return (
        <div className='upload-div'>
        <div className='d-flex justify-content-center'>
          <h4>Template Download / Data Upload</h4>
        </div>
        {/* <div className='d-flex justify-content-center'>
          <a href="#" target="_blank" style={{ fontSize: '16px', fontWeight: '700' }}>GIS Data Upload Instructions</a>
        </div> */}
        <div className='d-flex justify-content-center' style={{ paddingTop: '0px', fontSize: '16px' }}>
          <label className="file-upload">
            <span style= {{ fontSize: '16px' }}><strong>Upload Data (.Zip files only*) </strong></span>
          </label>
        </div>
        <div className='d-flex justify-content-center' style={{ paddingLeft: '60px', fontSize: '14px' }}>
          <FormGroup>
            <Input type="file" name="file" id="inFile" onChange={handleFileChange}/>
          </FormGroup>
        </div>
        <div>
          <div className='d-flex justify-content-center'>
        { isUploading && <Loader/> }
        </div>
          <label className={ messageClass } style={{ textAlign: 'center', paddingRight: '10px', fontSize: '15px' }}>
            <strong>
              {message}
            </strong>
          </label>
        </div>
      </div>
  )
}

export default UploadFile
