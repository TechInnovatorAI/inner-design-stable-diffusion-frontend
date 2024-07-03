import { Button, Card, Grid } from '@mui/material'
import ShowGenImage from '../showGenImage'
import Icon from 'src/@core/components/icon'
import { useState } from 'react'

export default function StagingImageThumnail({ imageUrl }: { imageUrl: any }) {
  const [showImage, setShowImage] = useState<boolean>(false)

  const handleShow = () => {
    // setModalImageUrl(url)
    setShowImage(true)
  }

  const handleDoubleGen = (url: string) => {
    // setUploadImageLink(url)
    // setInputPath(url)
    console.log(url)
  }

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <img
        src={imageUrl}
        alt='Picture of the author'
        width={'100%'}
        height={'auto'}
        className=' rounded-2xl border flex-wrap-reverse'
        style={{ borderRadius: 1, objectFit: 'contain' }}
      />
      <Grid
        sx={{
          position: 'absolute',
          top: '0px',
          zIndex: '1',
          background: '#00000077',
          width: '100%',
          height: '100%',
          display: 'none',
          flexDirection: 'column',
          justifyContent: 'center',
          margin: 'auto',
          placeItems: 'center',
          borderRadius: '10px'
        }}
      >
        <Button
          onClick={() => handleDoubleGen(imageUrl)}
          sx={{ position: 'absolute', bottom: 10, left: '90%', transform: 'translateX(-50%)', p: 0 }}
        >
          <Icon icon='material-symbols:chair-rounded' fontSize={30} />
        </Button>
        <Button
          onClick={() => handleShow()}
          sx={{ position: 'absolute', bottom: 10, left: '10%', transform: 'translateX(-50%)', p: 0 }}
        >
          <Icon icon='material-symbols:visibility-rounded' fontSize={30} />
        </Button>
      </Grid>
      <ShowGenImage open={showImage} setOpen={setShowImage} imageUrl={imageUrl} />
    </Card>
  )
}
