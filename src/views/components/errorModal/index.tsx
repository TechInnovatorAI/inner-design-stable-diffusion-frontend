// ** React Imports
import { Fragment } from 'react'
import { Button, Grid, Typography } from '@mui/material'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'

// Styled component for the form

const ErrorModal = ({
  open,
  setOpen,
  setGenRoom
}: {
  open: boolean
  setOpen: (boolean: boolean) => void
  setGenRoom: (boolean: boolean) => void
}) => {
  // ** States

  const handleClose = () => setOpen(false)

  const reDesign = () => {
    setOpen(false)
    setGenRoom(true)
  }

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={'lg'}
        aria-labelledby='max-width-dialog-title'
        sx={{ border: '0px none', background: '#0f0f0f00' }}
      >
        <Grid sx={{ p: 10 }}>
          <Typography color={'#40f1ff'} fontWeight={600} sx={{ pb: 4 }}>
            I couldn't make a suggestion.
          </Typography>
          <Typography color={'#40f1ff'} fontWeight={600}>
            Please try again.
          </Typography>
        </Grid>
        <Grid sx={{ display: 'flex', justifyContent: 'center', p: 2, gap: 6 }}>
          <Button onClick={handleClose} sx={{ color: 'white', border: '1px solid white' }}>
            close
          </Button>
          <Button onClick={reDesign} sx={{ color: 'white', border: '1px solid white' }} autoFocus>
            Regenerate
          </Button>
        </Grid>
      </Dialog>
    </Fragment>
  )
}

export default ErrorModal
