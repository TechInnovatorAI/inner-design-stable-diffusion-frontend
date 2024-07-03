// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

// Styled component for the form

const ShowGenImage = ({
  open,
  setOpen,
  imageUrl
}: {
  open: boolean
  setOpen: (boolean: boolean) => void
  imageUrl: string
}) => {
  // ** States

  const handleClose = () => setOpen(false)

  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose} maxWidth={'lg'} aria-labelledby='max-width-dialog-title'>
        <DialogTitle id='max-width-dialog-title' m={5}>
          お待たせ致しました。 表示結果は、こちらになります。
        </DialogTitle>
        <DialogContent sx={{ overflowY: 'auto' }} className='scroll'>
          <DialogContentText>
            <img
              src={imageUrl}
              alt='generated image'
              style={{ borderRadius: '8px', margin: 'auto', display: 'flex' }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleClose}>閉じる</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default ShowGenImage
