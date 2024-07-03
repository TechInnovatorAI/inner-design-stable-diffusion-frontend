// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
// import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserMenu from 'src/views/components/userMenu'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  // ** Props
  const {
    hidden,
    settings,

    // saveSettings
    toggleNavVisibility
  } = props
  const accesstoken = localStorage.getItem('accessToken') || null

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='mdi:menu' />
          </IconButton>
        ) : null}

        {/* <ModeToggler settings={settings} saveSettings={saveSettings} /> */}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {accesstoken ? (
          <UserMenu settings={settings} />
        ) : (
          <Button variant='contained' href='/auth/login'>
            ログイン
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default AppBarContent
