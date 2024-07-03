// ** React Imports
import { Fragment, useState } from 'react'
import { Card, Grid, Typography } from '@mui/material'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import { ProjectInterface } from 'src/context/types'

// import AwsS3DLComponent from '../awsS3DLComponent/indes'
import SwiperModal from '../swiperModal'
import AwsS3DLComponent from '../awsS3DLComponent/indes'

// Styled component for the form

const ProjectItemModal = ({
  open,
  setOpen,
  item
}: {
  open: boolean
  setOpen: (boolean: boolean) => void
  item: ProjectInterface
}) => {
  // ** States
  let itemArray: string[] = item?.url ?? []

  if (itemArray.length <= 3) {
    itemArray = [item?.baseUrl, ...itemArray]
  }
  const [openswiper, setOpenSwiper] = useState<boolean>(false)
  const [initShow, setInitShow] = useState<number>(0)
  const handleClose = () => setOpen(false)

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={'lg'}
        aria-labelledby='max-width-dialog-title'
        sx={{ background: 'none', border: '0px', backgroundColor: '#00000000' }}
        className='scroll'
      >
        <Grid sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Grid sx={{ display: 'flex', gap: 2, background: 'none', border: '0px none' }}>
            <Card sx={{ padding: 0, position: 'relative' }}>
              <Typography
                sx={{
                  position: 'absolute',
                  right: 20,
                  top: 10,
                  background: '#1d1d1d80',
                  px: 5,
                  py: 1,
                  borderRadius: 1
                }}
              >
                オリジナル
              </Typography>
              <img
                src={itemArray[0]}
                alt='generated image'
                style={{
                  borderRadius: '8px',
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setOpenSwiper(true)
                  setInitShow(0)
                }}
              />
            </Card>
            <Card sx={{ padding: 0, position: 'relative' }}>
              <Typography
                sx={{
                  position: 'absolute',
                  right: 20,
                  top: 10,
                  background: '#1d1d1d80',
                  px: 5,
                  py: 1,
                  borderRadius: 1
                }}
              >
                NEW
              </Typography>
              <Typography
                sx={{
                  position: 'absolute',
                  left: 20,
                  bottom: 10,
                  background: '#1d1d1d80',
                  px: 5,
                  py: 1,
                  borderRadius: 1
                }}
              >
                {item.prompt}
              </Typography>
              <AwsS3DLComponent url={itemArray[1]} name={item.name} />
              <img
                src={itemArray[1]}
                alt='generated image'
                style={{ borderRadius: '8px', width: '100%', height: '100%', cursor: 'pointer' }}
                onClick={() => {
                  setOpenSwiper(true)
                  setInitShow(1)
                }}
              />
            </Card>
          </Grid>
          <Grid sx={{ display: 'flex', gap: 2, background: 'none', border: '0px none' }}>
            <Card sx={{ padding: 0, position: 'relative' }}>
              <Typography
                sx={{
                  position: 'absolute',
                  right: 20,
                  top: 10,
                  background: '#1d1d1d80',
                  px: 5,
                  py: 1,
                  borderRadius: 1
                }}
              >
                NEW
              </Typography>
              <Typography
                sx={{
                  position: 'absolute',
                  left: 20,
                  bottom: 10,
                  background: '#1d1d1d80',
                  px: 5,
                  py: 1,
                  borderRadius: 1
                }}
              >
                {item.prompt}
              </Typography>
              <AwsS3DLComponent url={itemArray[2]} name={item.name} />
              <img
                src={itemArray[2]}
                alt='generated image'
                style={{
                  borderRadius: '8px',
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setOpenSwiper(true)
                  setInitShow(2)
                }}
              />
            </Card>
            <Card sx={{ padding: 0, position: 'relative' }}>
              <Typography
                sx={{
                  position: 'absolute',
                  right: 20,
                  top: 10,
                  background: '#1d1d1d80',
                  px: 5,
                  py: 1,
                  borderRadius: 1
                }}
              >
                NEW
              </Typography>
              <Typography
                sx={{
                  position: 'absolute',
                  left: 20,
                  bottom: 10,
                  background: '#1d1d1d80',
                  px: 5,
                  py: 1,
                  borderRadius: 1
                }}
              >
                {item.prompt}
              </Typography>
              <AwsS3DLComponent url={itemArray[3]} name={item.name} />
              <img
                src={itemArray[3]}
                alt='generated image'
                style={{ borderRadius: '8px', width: '100%', height: '100%', cursor: 'pointer' }}
                onClick={() => {
                  setOpenSwiper(true)
                  setInitShow(3)
                }}
              />
            </Card>
          </Grid>
        </Grid>
      </Dialog>
      <SwiperModal open={openswiper} setOpen={setOpenSwiper} images={itemArray} initShow={initShow} />
    </Fragment>
  )
}

export default ProjectItemModal
