import { type AllWidgetProps } from 'jimu-core'
import React, { useState, useEffect } from 'react'
import { type IMConfig } from '../config'
import config from '../internal_test/config.json'
// import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'jimu-ui'
import './app.css'
import PalDownload from './download/paldownload'
import SciDownload from './download/scidownload'
import RecDownload from './download/recdownload'
import AnotherTaskModal from './modals/anothertaskmodal'
import UploadFile from './upload'

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isAnotherTask, setIsAnotherTask] = useState(false)
  const [isUpload, setIsUpload] = useState<boolean>()
  const [isDownload, setIsDownload] = useState<boolean>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [actionType, setActionType] = useState('')
  const [taskId, setTaskId] = useState('')
  const [appType, setAppType] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [appNumber, setAppNumber] = useState('')
  const [isSuccessful, setIsSuccessful] = useState('')
  const [message, setMessage] = useState('')
  const [messageClass, setMessageClass] = useState('')

  const toggleAnotherTaskModal = () => { setIsAnotherTask(!isAnotherTask) }

  const raptorCloseTask = (paramResponse: boolean) => {
    setIsSuccessful(null)
    toggleAnotherTaskModal()

    const OtherTaskURL = config.links.UploadLinks.raptorCloseTask
    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        const status = xhr.status
        if (status >= 200 && status < 400) {
          console.log(this.responseText)
          console.log(xhr.responseText)
          let responseValue = ''
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          responseValue = xhr.response
          if (paramResponse) {
            setIsSuccessful('taskSuccess')
            setIsUploading(false)
          } else {
            setIsSuccessful('taskUnsuccess')
            setIsUploading(false)
          }
        } else {
          setIsSuccessful('taskError')
          setIsUploading(false)
          toggleAnotherTaskModal()
        }
      }
    }

    const formData = new FormData()
    formData.append('taskId', taskId)
    formData.append('isAnotherTaskNeeded', paramResponse)
    xhr.open('PUT', OtherTaskURL)
    xhr.setRequestHeader('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'))
    xhr.send(formData)
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const action = params.get('actionType')
    const raptorType = params.get('raptorType')
    const Id = params.get('taskId')
    const appNumber = params.get('appNumber')

    if (action === 'Download') {
      setIsUpload(false)
      setIsDownload(true)
    } else {
      setIsUpload(true)
      setIsDownload(false)
    }
    setActionType(action)
    setAppType(raptorType)
    setTaskId('66666')
    setAppNumber(appNumber)
  }, [])

  function showTaskRequiredMessage () {
    toggleAnotherTaskModal()
  }

  const onDownloadTemplate = (module: string, infile: string) => {
    const xhr = new XMLHttpRequest()
    const filedownloadPath = config.links.UploadLinks.downloadUrl
    const inFileName = infile

    xhr.open('GET', filedownloadPath + module + '&fileName=' + inFileName)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        const downloadUrl = URL.createObjectURL(xhr.response)
        // eslint-disable-next-line prefer-const
        let a = document.createElement('a')
        document.body.appendChild(a)
        a.href = downloadUrl
        a.download = inFileName
        a.click()
      }
    }
    xhr.responseType = 'blob'
    xhr.setRequestHeader('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'))
    xhr.send()
  }

  const onDownloadClick = (module: string, infile: string) => {
    const xhr = new XMLHttpRequest()
    const filedownloadPath = config.links.UploadLinks.downloadUrl
    const inFileName = infile

    xhr.open('GET', filedownloadPath + module + '&fileName=' + inFileName)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        const downloadUrl = URL.createObjectURL(xhr.response)
        // eslint-disable-next-line prefer-const
        let a = document.createElement('a')
        document.body.appendChild(a)
        a.href = downloadUrl
        a.download = inFileName
        a.click()
      }
    }
    xhr.responseType = 'blob'
    xhr.setRequestHeader('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'))
    xhr.send()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const handleClose = () => {
    setIsDownload(false)
    setIsUpload(true)
    setIsUploading(false)
    close()
  }

  const renderComponent = () => {
    switch (appType) {
      case 'PAL':
        return <PalDownload onDownloadClick={ onDownloadClick } onDownloadTemplate={ onDownloadTemplate }/>
      case 'SCI':
        return <SciDownload onDownloadClick={ onDownloadClick } onDownloadTemplate={ onDownloadTemplate } />
      case 'REC':
        return <RecDownload />
    }
  }

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
    setIsSuccessful(null)
    if (taskId == null || taskId === '') {
      alert('No Application number found in the URL, please check with Raptor Administrator.')
      return
    }
    setIsUploading(true)
    const uploadURL = config.links.UploadLinks.uploadUrl
    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        const status = xhr.status
        if (status >= 200 && status < 400) {
          let responseValue = ''
          responseValue = xhr.response.substring(11, 16)

          if (responseValue.includes('true')) {
            setIsSuccessful('success')
            if (appType === 'PAL') {
              showTaskRequiredMessage()
            } else if (appType === 'SCI') {
              raptorCloseTask(false)
            }
            setIsUploading(false)
          } else {
            setIsSuccessful('unsuccessful')
            setIsUploading(false)
          }
        } else {
          setIsSuccessful('unsuccessful')
          setIsUploading(false)
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

  useEffect(() => {
    if (isSuccessful === 'success') {
      setMessage('Data was successfully uploaded. BLM staff will now review the data.')
      setMessageClass('success')
    } else if (isSuccessful === 'unsuccessful') {
      setMessage('Data upload was unsuccessful. Check email for a detailed data quality report. Resolve these data quality errors then re-initiate data upload here.')
      setMessageClass('unsuccessful')
    } else if (isSuccessful === 'taskSuccess') {
      setMessage(' A task will be created after the BLM reviews this submission. ')
      setMessageClass('success')
    } else if (isSuccessful === 'taskUnsuccess') {
      setMessage('You have responded that another data upload task is not needed. The BLM may require another data upload after reviewing this submission. ')
      setMessageClass('success')
    } else if (isSuccessful === 'taskError') {
      setMessage('Error: Please reach out to  Raptor System and/or GIS Administrator.')
      setMessageClass('unsuccessful')
    } else if (isSuccessful === null) {
      setMessage('')
      setMessageClass('nothing')
    }
  }, [isSuccessful])

  return (
    <div className="widget-demo jimu-widget m-2">
      { isUpload ? <UploadFile handleFileChange={handleFileChange} message={message} messageClass={messageClass} isUploading={isUploading} /> : ''}
      { isDownload
        ? <div className='download-div' style={{ overflowY: 'scroll', height: '400px' }}>
            <div>
              <div className='download-container'>
                <h5>Template Download</h5>
                <p style={{ fontSize: '14px' }}>GIS field data can be captured and submitted to RAPTOR using one of the file types listed below. Choose one of the following options, then click the
                  button to download its template. When data collection is complete you will return to RAPTOR and select the Upload Data option.
                </p>
              </div>
              <div className='download-links'>
                { renderComponent() }
              </div>
            </div>
          </div>
        : '' }
      <div className='d-flex justify-content-around'>
        <div style={{ paddingTop: '10px' }}>
          { isUpload ? <span className='upload-btns'><Button size="lg" color="primary" className='btn btn-primary' onClick={onUploadClick}>Upload</Button></span> : '' }
          <span className='upload-btns'><Button size="lg" color="primary" className='btn btn-primary' onClick={handleClose}>Close</Button></span>
          {isAnotherTask && <AnotherTaskModal isOpen={isAnotherTask} toggle={toggleAnotherTaskModal} raptorCloseTask={raptorCloseTask} />}
        </div>
      </div>
    </div>
  )
}

export default Widget
