import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface ConfirmationModalProps {
  open: boolean
  setOpen: (boolean: boolean) => void
  deleteProjectId: number
  confirm: (number: number) => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, setOpen, deleteProjectId, confirm }) => {
  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirm = () => {
    confirm(deleteProjectId)
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
        <DialogTitle id='alert-dialog-title'>削除の確認</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>この項目を削除してもよろしいですか?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            キャンセル
          </Button>
          <Button onClick={handleConfirm} color='primary' autoFocus>
            消去
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfirmationModal
