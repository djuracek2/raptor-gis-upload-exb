import { React, type AllWidgetProps } from 'jimu-core'
import React, { useState } from 'react'
import { Button, Row, Container, Col } from 'jimu-ui'
import '../app.css'
import survey123Image from '../images/appicon.png'
import accessImage from '../images/microsoft-access-2019.png'
import gdbImage from '../images/fileGDB.png'
import { activePagePartChanged } from 'jimu-core/lib/app-actions'

const downloadFilePaths = {
    PAL: {
      fileGDB: 'Raptor_Paleo_FGDB_11.gdb.zip',
      fileGDBInst: 'RAPTORGISPALEOGDBDownloadandDataEntry.pdf',
      fileS123: 'PaleoS123AndFGDB_12.zip',
      fileS123Inst: 'RAPTORSurvey123GeoPlatformInstructions.pdf',
      fileMAccess: 'RAPTOR_Paleo_Access_13.zip',
      fileMAccessInst: 'RAPTORGISSCISHPandDataEntry.pdf'
    },
    SCI: {
      fileGDB: 'RAPTOR_SCIENCE_RESEARCH_POLY_gdb_14.zip',
      fileGDBInst: 'RAPTORGISSCIGDBDownloadandDataEntry.pdf',
      fileS123: 'Science_S123AndFGDB_15.zip',
      fileS123Inst: 'RAPTORSurvey123GeoPlatformInstructions.pdf',
      fileMAccess: 'RAPTOR_SCIENCE_RESEARCH_POLY_16.zip',
      fileMAccessInst: 'RAPTORGISSCISHPandDataEntry.pdf'
    }
  }

  const RecLinks = {
    ScienceGISDataDic: "RAPTOR_GenSci_Data_Dictionary.xlsx",
    FileGDBDownload: 'RAPTOR_SCIENCE_RESEARCH_POLY_gdb_14.zip',
    Survey123Download: 'Science_S123AndFGDB_15.zip',
    Survey123WorkflowGuide: "RAPTORSurvey123GeoPlatformInstructions.pdf",
    Survey123GetStarted: 'BLMGeoPlatformStepsforBLMPartnerDataEditors.pdf',
    ShapefileDownload: 'RAPTOR_SCIENCE_RESEARCH_POLY_16.zip'
  }

const RecDownload = (Params) => {

    console.log('app type is:', Params)
  function getCookie (cname) {
    const name = cname + '='
    const decodedCookies = decodeURIComponent(document.cookie)
    console.log(document.cookie)
    //console.log('All readable cookies in browser = '+decodedCookies);
    //Get key-value pair of cookies.
    const ca = decodedCookies.split(';')
    //Iterate over the cookies.
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      //remove spaces before the cookie name, if any.
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      //Check for the match of the given cookie name.
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''

    // return "e9c3d313-c06b-4789-bd20-e2193cd22dc6"
  }

  const onDownloadTemplate = (module, infile) => {
    const xhr = new XMLHttpRequest()
    const filedownloadPath = 'http://localhost:8080/raptor/api/attachment/downloadGISTemplate?module='
    // const filedownloadPath = widgetContext.appConfig.RaptorConfigServices.filedownloadURL;
    const inFileName = infile

    xhr.open('GET', filedownloadPath + module + '&fileName=' + inFileName)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
      //alert(`Loaded: ${xhr.status} ${xhr.responseText}`)
      //console.log(xhr.responseText);
        const downloadUrl = URL.createObjectURL(xhr.response)
        let a = document.createElement('a')
        document.body.appendChild(a)
        a.style = 'display: none'
        a.href = downloadUrl
        a.download = inFileName
        a.click()
      }
    }
    xhr.responseType = 'blob'
    xhr.setRequestHeader('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'))
    xhr.send()
  }

  const onDownloadClick = (module, infile) => {
    const xhr = new XMLHttpRequest()
    const filedownloadPath = 'http://localhost:8080/raptor/api/attachment/downloadGISTemplate?module='
    // const filedownloadPath = widgetContext.appConfig.RaptorConfigServices.filedownloadURL;
    const inFileName = infile

    xhr.open('GET', filedownloadPath + module + '&fileName=' + inFileName)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        //alert(`Loaded: ${xhr.status} ${xhr.responseText}`)
        console.log(xhr.responseText)
        const downloadUrl = URL.createObjectURL(xhr.response)
        let a = document.createElement('a')
        document.body.appendChild(a)
        a.style = 'display: none'
        a.href = downloadUrl
        a.download = inFileName
        a.click()
      }
    }
    xhr.responseType = 'blob'
    xhr.setRequestHeader('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));
    xhr.send()
  }

  return (
    <Container>
        <Row className='downloadRow'>
          ''
        </Row>
    </Container>
  )
}

export default RecDownload
