// ** MUI Imports
// import Card from '@mui/material/Card'
// import Grid from '@mui/material/Grid'

// import Selectstyle from 'src/views/pages/generateboard/selectstyle'
// import Input from 'src/views/pages/generateboard/input'
// import GeneratedImage from 'src/views/pages/generateboard/generatedImage'
import Generateboard from 'src/views/pages/generateboard'

const Genboard = () => {
  return <Generateboard />
}

Genboard.acl = {
  action: 'read',
  subject: 'acl-page'
}
Genboard.guestGuard = true

export default Genboard
