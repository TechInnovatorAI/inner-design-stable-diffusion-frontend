import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import MaterialCustomCheckbox from './materialCustomCheckbox'

interface ConfirmationModalProps {
  open: boolean
  setOpen: (boolean: boolean) => void
}

const MaterialModal: React.FC<ConfirmationModalProps> = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        maxWidth={'sm'}
      >
        <DialogTitle id='alert-dialog-title'>マテリアルから選択(複数選択可)</DialogTitle>
        <DialogContent className='scroll'>
          <MaterialCustomCheckbox />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default MaterialModal
