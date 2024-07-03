// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { Grid } from '@mui/material'

const Loading = ({ open }: { open: boolean }) => {
  return (
    <Dialog fullScreen aria-labelledby='full-screen-dialog-title' open={open} sx={{ opacity: 0.7, strokeOpacity: 1 }}>
      <DialogContent sx={{ display: 'flex' }}>
        <Grid sx={{ margin: 'auto', display: 'flex', flexDirection: 'row' }}>
          <div className='wave'></div>
          <div className='wave'></div>
          <div className='wave'></div>
          <div className='wave'></div>
          <div className='wave'></div>
          <div className='wave'></div>
          <div className='wave'></div>
          <div className='wave'></div>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default Loading
