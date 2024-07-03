// EditBoardModal.tsx

import React from 'react'
import { Modal, Box, Button } from '@mui/material'
import EditBoard from '../editBoard'

interface EditBoardModalProps {
  open: boolean
  setOpen: (boolean: boolean) => void
  width: number
  height: number
  inputPath: string
  setMaskImage: (string: string) => void
}

const EditBoardModal: React.FC<EditBoardModalProps> = ({ open, setOpen, width, height, inputPath, setMaskImage }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='image-modal'
      aria-describedby='image-modal-description'
    >
      <>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '100%',
            px: 60,
            py: 25
          }}
        >
          <EditBoard width={width} height={height} inputPath={inputPath} setMaskImage={setMaskImage} />
          <Button sx={{ position: 'absolute', right: 60 }} onClick={() => setOpen(false)}>
            close
          </Button>
        </Box>
      </>
    </Modal>
  )
}

export default EditBoardModal
