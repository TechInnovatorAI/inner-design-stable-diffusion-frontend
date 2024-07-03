import { Card } from '@mui/material'

export default function ImageThumnail({ imageUrl }: { imageUrl: any }) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={imageUrl}
        alt='Picture of the author'
        width={'100%'}
        height={'auto'}
        className=' rounded-2xl border flex-wrap-reverse'
        style={{ borderRadius: 1, objectFit: 'contain' }}
      />
    </Card>
  )
}
