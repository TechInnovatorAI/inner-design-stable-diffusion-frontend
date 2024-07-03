import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

interface DeleteSuccessModalProps {
  open: boolean
  onClose: (boolean: boolean) => void
}

const DeleteSuccessModal: React.FC<DeleteSuccessModalProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>削除成功</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>アイテムは正常に削除されました。</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} color='primary'>
          クローズ
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteSuccessModal
