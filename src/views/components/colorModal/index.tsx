import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import ColorCustomCheckbox from './ColorCustomCheckbox'

interface ConfirmationModalProps {
  open: boolean
  setOpen: (boolean: boolean) => void
}

const ColorModal: React.FC<ConfirmationModalProps> = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = () => {
    setOpen(false)
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>フロア材から選択(複数選択可)</DialogTitle>
        <DialogContent className='scroll'>
          <ColorCustomCheckbox />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color='primary' autoFocus>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ColorModal
