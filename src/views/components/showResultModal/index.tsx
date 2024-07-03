// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { ProjectInterface } from 'src/context/types'
import ShowResult from '../showResult'

const ShowResultModal = ({
  open,
  setOpen,
  project,
  setUploadImageLink,
  setInputPath,

  // setPaintState,
  setOpenEditModal,
  setGenRoom
}: {
  open: boolean
  setOpen: (boolean: boolean) => void
  project: ProjectInterface
  setUploadImageLink: (string: string) => void
  setInputPath: (string: string) => void

  // setPaintState: (boolean: boolean) => void
  setOpenEditModal: (boolean: boolean) => void
  setGenRoom: (boolean: boolean) => void
}) => {
  // ** States

  const theme = useTheme()
  const handleClose = () => setOpen(false)
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
        fullScreen={fullScreen}
        maxWidth={'lg'}
        sx={{ width: '100%', background: 'none', border: '0px', backgroundColor: '#00000000', overflow: 'hidden' }}
        className='scroll'
      >
        <ShowResult
          project={project}
          setUploadImageLink={setUploadImageLink}
          setInputPath={setInputPath}
          setOpen={setOpen}
          setOpenEditModal={setOpenEditModal}
          setGenRoom={setGenRoom}
        />
      </Dialog>
    </Fragment>
  )
}

export default ShowResultModal
