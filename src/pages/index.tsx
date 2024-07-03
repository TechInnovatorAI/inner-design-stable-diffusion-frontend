// ** MUI Imports
// import Card from '@mui/material/Card'
// import Grid from '@mui/material/Grid'

// import Selectstyle from 'src/views/pages/generateboard/selectstyle'
// import Input from 'src/views/pages/generateboard/input'
// import GeneratedImage from 'src/views/pages/generateboard/generatedImage'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Dashboard = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/genboard')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

Dashboard.acl = {
  action: 'read',
  subject: 'acl-page'
}
Dashboard.guestGuard = true

export default Dashboard
