import { useState } from 'react'

// ** React Imports
import { Grid, ImageList, ImageListItem, Typography } from '@mui/material'

// ** MUI Imports
import { ProjectInterface } from 'src/context/types'
import { CompareIcon, DownloadIcon, EditIcon, RegenerateIcon , CollectionsBookmarkOutlinedIcon } from './Icons'
import SwiperModal from '../swiperModal'
import { downloadImage } from 'src/views/utils/download'

// Styled component for the form

const ShowResult = ({
  project,
  setUploadImageLink,
  setInputPath,
  setOpen,
  setOpenEditModal,
  setGenRoom
}: {
  project: ProjectInterface
  setUploadImageLink: (string: string) => void
  setInputPath: (string: string) => void
  setOpen?: (boolean: boolean) => void
  setOpenEditModal: (boolean: boolean) => void
  setGenRoom: (boolean: boolean) => void
}) => {
  let itemArray: string[] = project?.url ?? []

  if (itemArray.length <= 3) {
    itemArray = [project?.baseUrl, ...itemArray]
  }

  // ** States
  const [initShow, setInitShow] = useState<number>(0)
  const [openswiper, setOpenSwiper] = useState<boolean>(false)
  const handleDownload = async (imageUrl: string) => {
    downloadImage(imageUrl, 'downloadfile')
    console.log(imageUrl)
  }

  const handleDoubleGen = (url: string) => {
    setUploadImageLink(url)
    setInputPath(url)
  }

  const comingsoon = () => {
    alert('coming soon')
  }

  const handleEdit = async (baseLink: string) => {
    await handleDoubleGen(baseLink)
    setOpenEditModal(true)
  }

  const handleRestyle = async (baseLink: string) => {
    await handleDoubleGen(baseLink)
    setGenRoom(true)
    setOpen ? setOpen(false) : false
  }

  const handleCollect = async (baseLink:string) => {
    await handleDoubleGen(baseLink)
  }

  return (
    <>
      <ImageList variant='quilted' cols={2} gap={8} className='scroll'>
        {Array.isArray(itemArray) && itemArray.length ? (
          itemArray.map((item, index) => (
            <ImageListItem sx={{}} key={index}>
              <img
                src={`${item}?w=248&fit=crop&auto=format`}
                srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={'newfile'}
                loading='lazy'
                style={{ borderRadius: '10px', cursor: 'pointer' }}
                onClick={() => {
                  setOpenSwiper(true)
                  setInitShow(index)
                }}
              />
              <Grid
                sx={{
                  position: 'absolute',
                  bottom: '0px',
                  zIndex: '1',
                  background: '#00000077',
                  width: '100%',
                  height: '80px',
                  display: 'none',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  margin: 'auto',
                  placeItems: 'center',
                  borderRadius: '10px'
                }}
              >
                <Grid
                  flex={'nowrap'}
                  gap={5}
                  sx={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', p: 0 }}
                >
                  <Grid
                    width={90}
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => handleDownload(item)}
                  >
                    <DownloadIcon />
                  </Grid>
                  <Grid
                    width={90}
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => comingsoon()}
                  >
                    <CompareIcon />
                  </Grid>
                  <Grid
                    width={90}
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => handleRestyle(item)}
                  >
                    <RegenerateIcon />
                  </Grid>
                  <Grid
                    width={90}
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => handleEdit(item)}
                  >
                    <EditIcon />
                  </Grid>
                  <Grid
                    width={90}
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => handleCollect(item)}
                  >
                    <CollectionsBookmarkOutlinedIcon />
                  </Grid>
                </Grid>
              </Grid>
            </ImageListItem>
          ))
        ) : (
          <Typography variant='h6'>新しいデザインの作成</Typography>
        )}
      </ImageList>
      <SwiperModal open={openswiper} setOpen={setOpenSwiper} images={itemArray} initShow={initShow} />
    </>
  )
}

export default ShowResult
