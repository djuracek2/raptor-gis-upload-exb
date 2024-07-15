import { React, type AllWidgetProps } from 'jimu-core'
import React, { useState, useEffect } from 'react'
import { type IMConfig } from '../config'
import { FormGroup, Input, Button } from 'jimu-ui'

const UploadFile = ({ appType, onFileChange, message }) => {
  const handleInputChange = (event) => {
    const selectedFile = event.target.files[0]
    onFileChange(selectedFile)
  }

  return (
        <div className='upload-div'>
        <div className='d-flex justify-content-center'>
          <h5>Template Download / Data Upload</h5>
        </div>
        <div className='d-flex justify-content-center'>
          <a href="#" target="_blank">GIS Data Upload Instructions</a>
        </div>
        <div className='d-flex justify-content-center' style={{ paddingTop: '10px' }}>
          <label className="file-upload">
            <span><strong>Upload Data (.Zip files only*) </strong></span>
          </label>
        </div>
        <div className='d-flex justify-content-center' style={{ paddingLeft: '60px' }}>
          <FormGroup>
            <Input type="file" name="file" id="inFile" onChange={handleInputChange}/>
          </FormGroup>
        </div>
        <div className="d-flex">
          <label className="file-success">
            {message}
          </label>
        </div>
      </div>
  )
}

export default UploadFile