// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
// import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserMenu from 'src/views/components/userMenu'

interface Props {
  settings: Settings
  saveSettings: (values: Settings) => void
}
const AppBarContent = (props: Props) => {
  // ** Props
  const accesstoken = localStorage.getItem('accessToken') || null
  const {
    settings

    // saveSettings
  } = props

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {/* <ModeToggler settings={settings} saveSettings={saveSettings} /> */}
      {accesstoken ? (
        <UserMenu settings={settings} />
      ) : (
        <Button variant='contained' href='/auth/login'>
          ログイン
        </Button>
      )}
    </Box>
  )
}

export default AppBarContent
