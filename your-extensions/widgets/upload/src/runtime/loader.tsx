import React from 'react'
// import { Progress } from 'jimu-ui'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

const Loader = () => {
  return (
    <Box sx={{ width: '60%' }}>
      <LinearProgress />
    </Box>
  )
}
export default Loader
