import React from 'react'
import { Button } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { downloadImage } from 'src/views/utils/download'

const AwsS3DLComponent = ({ url, name }: { url: string; name: string }) => {
  const handle = () => {
    downloadImage(url, name)
  }

  return (
    <Button
      onClick={handle}
      sx={{ position: 'absolute', bottom: 10, left: '90%', transform: 'translateX(-50%)', p: 0 }}
    >
      <Icon icon='material-symbols:download-rounded' fontSize={40} />
    </Button>
  )
}

export default AwsS3DLComponent
