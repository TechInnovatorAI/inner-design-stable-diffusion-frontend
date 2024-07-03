import { useState, useEffect } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Selectstyle from './selectstyle'
import Input from './input'
import StagingGeneratePanel from './stagingGeneratePanel'

import { imageSizeInterface } from 'src/context/types'
import EditBoardModal from 'src/views/components/editBoardModal'
import RestyleGeneratePanel from './rstyleGeneratePanel'

const Generateboard = () => {
  const file: File = new File(['foo'], 'foo.png')
  const [inputPath, setInputPath] = useState<string>('')
  const [paintState, setPaintState] = useState<boolean>(false)
  const [uploadImage, setUploadImage] = useState<File>(file)
  const [maskImage, setMaskImage] = useState<any>('')
  const [width, setWidth] = useState<number>(768)
  const [height, setHeight] = useState<number>(768)
  const [selected, setSelected] = useState<number>(0)
  const [uploadImageLink, setUploadImageLink] = useState<string>('')
  const [openEditModal, setOpenEditModal] = useState<boolean>(false)
  const [genRoom, setGenRoom] = useState<boolean>(false)
  const [toggle, setToggle] = useState<boolean>(false)
  const [uploadToggle, setUploadtoggle] = useState<boolean>(false)

  function getImageSize(imageUrl: string): Promise<imageSizeInterface> {
    return new Promise((resolve, reject) => {
      const image = new Image()
      image.onload = () => {
        const imageSize: imageSizeInterface = {
          width: image.width,
          height: image.height
        }
        resolve(imageSize)
      }
      image.onerror = () => {
        reject(new Error('Error loading image.'))
      }
      image.src = imageUrl
    })
  }

  const calcSize = (imageSize: imageSizeInterface) => {
    let _width: number = imageSize.width
    let _height: number = imageSize.height
    if (_width >= 768 || _height >= 768) {
      if (_width > imageSize.height) {
        _width = 768
        _height = Math.floor((imageSize.height / imageSize.width) * 768)
        const tempheight: number = _height
        _height = 64 * Math.floor(tempheight / 64 + 1)
      } else if (_width < _height) {
        _height = 768
        _width = Math.floor((imageSize.width / imageSize.height) * 768)
        const tempwidth: number = _width
        _width = 64 * Math.floor(tempwidth / 64 + 1)
      } else {
        _height = 768
        _width = 768
      }
      setWidth(_width)
      setHeight(_height)
    } else {
      const tempwidth: number = _width
      const tempheight: number = _height
      _width = 64 * Math.floor(tempwidth / 64)
      _height = 64 * Math.floor(tempheight / 64)
      console.log(_width, _height)
      setWidth(_width)
      setHeight(_height)
    }
    setUploadtoggle(!uploadToggle)
  }

  useEffect(() => {
    if (inputPath) {
      setWidth(0)
      getImageSize(inputPath)
        .then((imageSize: imageSizeInterface) => {
          console.log('Image Size:', imageSize)
          calcSize(imageSize)
        })
        .catch(error => {
          console.error(error)
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputPath])

  return (
    <Grid container spacing={1} position='relative'>
      <Grid container item spacing={1}>
        <Grid item sm={12} md={3} order={1}>
          <Input
            inputPath={inputPath}
            setInputPath={setInputPath}
            paintState={paintState}
            setPaintState={setPaintState}
            uploadImage={uploadImage}
            setUploadImage={setUploadImage}
            maskImage={maskImage}
            setMaskImage={setMaskImage}
            width={width}
            height={height}
            setSelected={setSelected}
            uploadImageLink={uploadImageLink}
            setUploadImageLink={setUploadImageLink}
            setOpenEditModal={setOpenEditModal}
            genRoom={genRoom}
            setGenRoom={setGenRoom}
            setToggle={setToggle}
            uploadToggle={uploadToggle}
          />
        </Grid>
        <Grid
          item
          md={9}
          order={3}
          sx={{
            '@media (min-width: 900px)': {
              order: 2
            }
          }}
        >
          {paintState ? (
            <StagingGeneratePanel
              inputPath={inputPath}
              setMaskImage={setMaskImage}
              width={width}
              height={height}
              setUploadImageLink={setUploadImageLink}
              setInputPath={setInputPath}
              setOpenEditModal={setOpenEditModal}
              setGenRoom={setGenRoom}
              toggle={toggle}
              setToggle={setToggle}
            />
          ) : (
            <RestyleGeneratePanel
              inputPath={inputPath}
              setMaskImage={setMaskImage}
              width={width}
              height={height}
              setUploadImageLink={setUploadImageLink}
              setInputPath={setInputPath}
              setOpenEditModal={setOpenEditModal}
              setGenRoom={setGenRoom}
              toggle={toggle}
              setToggle={setToggle}
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          bottom={40}
          order={2}
          height={150}
          sx={{
            '@media (min-width: 900px)': {
              order: 3
            }
          }}
        >
          <Card sx={{ paddingTop: 1 }}>
            <Selectstyle selected={selected} />
          </Card>
        </Grid>
      </Grid>
      <EditBoardModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        width={width}
        height={height}
        inputPath={inputPath}
        setMaskImage={setMaskImage}
        
      />
    </Grid>
  )
}

Generateboard.guestGuard = true

export default Generateboard
