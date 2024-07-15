import { React, type AllWidgetProps } from 'jimu-core'
import React, { useState, useEffect } from 'react'
import { type IMConfig } from '../config'
import { FormGroup, Input, Button } from 'jimu-ui'
import './app.css'
import PalDownload from './download/paldownload'
import SciDownload from './download/scidownload'
import RecDownload from './download/recdownload'
import UploadFile from './upload'

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isUpload, setIsUpload] = useState(true)
  const [isDownload, setIsDownload] = useState(false)
  const [actionType, setActionType] = useState('Download')
  const [appType, setAppType] = useState('SCI')
  const [isSuccessful, setIsSuccessful] = useState('')
  // const [message, setMessage] = useState('')
  // const [messageClass, setMessageClass] = useState('')
 
  const handleFileChange = (selectedfile) => {
    // const file = event.target.files[0]
    setSelectedFile(selectedfile)
    console.log(selectedfile)
  }

  const handleDownload = () => {
    const isActive = !isDownload
    setIsUpload(false)
    setIsDownload(isActive)
  }

  const handleClose = () => {
    setIsDownload(false)
    setIsUpload(true)
  }

  const renderComponent = () => {
    switch (appType) {
      case 'PAL':
        return <PalDownload appType={appType} />
      case 'SCI':
        return <SciDownload appType={appType} />
      case 'REC':
        return <RecDownload appType={appType} />
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const actionType = params.get('actionType')
    const raptorType = params.get('raptorType')
    setActionType(actionType)
    // setAppType(raptorType)
    setAppType('PAL')
  }, [])

  let taskId

  function getCookie (cname) {
    const name = cname + '='
    const decodedCookies = decodeURIComponent(document.cookie)
    console.log(document.cookie)
    const ca = decodedCookies.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }

  function onUploadClick () {
    taskId = '60051'
    if (taskId == null || taskId === '') {
      alert('No Application number found in the URL, please check with Raptor Administrator.')
      return
    }
    const uploadURL = 'http://localhost:8080/raptor/api/gis/uploadDataFile'
    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        const status = xhr.status
        if (status >= 200 && status < 400) {
          console.log(this.responseText)
          console.log(xhr.responseText)
          let responseValue = ''
          responseValue = xhr.response.substring(11, 16)
          if (responseValue.includes('true')) {
            setIsSuccessful('success')
          } else {
            setIsSuccessful('unsuccessful')
          }
        } else {
          setIsSuccessful('unsuccessful')
        }
      }
    }

    const formData = new FormData()
    formData.append('taskId', taskId)
    formData.append('file', selectedFile)
    xhr.open('POST', uploadURL)
    xhr.setRequestHeader('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'))
    xhr.send(formData)
  }

  let message
  let messageClass
  if (isSuccessful === 'success') {
    message = 'Data was successfully uploaded. BLM staff will now review the data.'
    messageClass = 'message-success'
    // setMessageClass('message-success')
  } else if (isSuccessful === 'unsuccessful') {
    message = 'Data upload was unsuccessful. Check email for a detailed data quality report. Resolve these data quality errors then re-initiate data upload here.'
    messageClass = 'message-failure'
    // setMessageClass('message-failure')
  } else {
    message = ''
  }

  return (
    <div className="widget-demo jimu-widget m-2">
      { isUpload ?
      < UploadFile appType={appType} onFileChange={handleFileChange} message={message} messageClass={messageClass} />
        : ''}
      { isDownload
        ? <div className='download-div'>
            <div>
              <div className='download-container'>
                <h5>Template Download</h5>
                <p>GIS field data can be captured and submitted to RAPTOR using one of the file types listed below. Choose one of the following options, then click the
                  button to download its template. When data collection is complete you will return to RAPTOR and select the Upload Data option.
                </p>
              </div>
              <div>
                { renderComponent() }
              </div>
            </div>
          </div>
        : '' }
      <div className='d-flex justify-content-around'>
        <div style={{ paddingTop: '10px' }}>
          <Button color="primary" onClick={handleDownload}>Download</Button>
          <Button color="primary" onClick={onUploadClick}>Upload</Button>
          <Button color="primary" onClick={handleClose}>Close</Button>
        </div>
      </div>
    </div>
  )
}

export default Widget
