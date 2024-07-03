// ** React Imports
import { useState, SyntheticEvent, useEffect, MouseEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { setPrompt } from 'src/redux/slice/promptSlice'

import { Card, CardContent, Typography, Button, Grid } from '@mui/material'
import FileUploaderSingle from 'src/views/components/fileUploaderSingle'

// ** MUI Imports
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { toast } from 'react-hot-toast'
import Loading from 'src/views/components/loading'
import ErrorModal from 'src/views/components/errorModal'

// ** Data
import { RoomType } from 'src/context/types'
import { setTempUrl } from 'src/redux/slice/tempUrlSlice'
import {
  generateMaskRestyleImage,
  generateRestyleImage,
  generateStagingImage,
  uploadImageService,
  uploadMaskService,
  uploadNoneMask
} from 'src/pages/api/dashboardService'
import { Box } from '@mui/system'
import { ProjectInterface } from 'src/context/types'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { designStyle, roomNameList } from 'src/context/promptValue'
import { CustomRadioImgData } from 'src/views/components/custom-radio/types'
import ShowResultModal from 'src/views/components/showResultModal'
import FloorModal from 'src/views/components/floorModal'
import MaterialModal from 'src/views/components/materialModal'
import ColorModal from 'src/views/components/colorModal'

const Input = ({
  inputPath,
  setInputPath,
  paintState,
  setPaintState,
  uploadImage,
  setUploadImage,
  maskImage,
  setMaskImage,
  width,
  height,
  setSelected,
  uploadImageLink,
  setUploadImageLink,
  setOpenEditModal,
  genRoom,
  setGenRoom,
  uploadToggle
}: {
  inputPath: string
  setInputPath: (string: string) => void
  paintState: boolean
  setPaintState: (boolean: boolean) => void
  uploadImage: File
  setUploadImage: (File: File) => void
  maskImage: any
  setMaskImage: (any: any) => void
  width: number
  height: number
  setSelected: (number: number) => void
  uploadImageLink: string
  setUploadImageLink: (string: string) => void
  setOpenEditModal: (boolean: boolean) => void
  genRoom: boolean
  setGenRoom: (boolean: boolean) => void
  setToggle: (boolean: boolean) => void
  uploadToggle: boolean
}) => {
  const loginNote = () => toast.success('ユーザー登録をしてください。')

  const [upLoadMaskLink, setUpLoadMaskLink] = useState<string>('')

  const router = useRouter()

  // const [roomTypePrompt, setRoomTypePrompt] = useState<string>('Living room')

  const prompt = useSelector((state: any) => state.prompt)
  const materialPrompt = useSelector((state: any) => state.materialPrompt)
  const materialTitle = useSelector((state: any) => state.materialTitle)
  const colorPrompt = useSelector((state: any) => state.colorPrompt)
  const colorTitle = useSelector((state: any) => state.colorTitle)
  const floorPrompt = useSelector((state: any) => state.floorPrompt)
  const floorTitle = useSelector((state: any) => state.floorTitle)
  const [colorOpen, setColorOpen] = useState<any>(false)
  const [floorOpen, setFloorOpen] = useState<any>(false)
  const [materialOpen, setMaterialOpen] = useState<any>(false)
  const dispatch = useDispatch()

  const [roomName, setRoomName] = useState<RoomType | null>({ title: 'リビング', value: 'LivingRoom', nameId: 0 })
  const [loading, setLoading] = useState<boolean>(false)
  const [showImage, setShowImage] = useState<boolean>(false)
  const [newProject, setNewProject] = useState<ProjectInterface>({
    id: 1,
    name: 'name',
    userId: 2,
    prompt: 'how',
    baseUrl: 'url',
    url: ['1'],
    createdAt: '',
    method: 'restyle'
  })
  const [showError, setShowError] = useState<boolean>(false)
  const [editPrompt, setEditPrompt] = useState<string>('')
  const [uploadFlag, setUploadFlag] = useState<boolean>(false)

  const handleChange = (event: any) => {
    setEditPrompt(event.target.value)
  }

  const checkLogin = () => {
    const loginuserData = JSON.parse(localStorage.getItem('userData') as string) || null
    if (loginuserData != null) {
      return true
    } else {
      loginNote()
      router.replace('/auth/login')
    }
  }

  const handleAlignment = (event: MouseEvent<HTMLElement>, newAlignment: boolean | null) => {
    checkLogin()
    if (newAlignment !== null) {
      setPaintState(newAlignment)
      console.log(paintState)
    }
  }

  const roomTypeHandleChange = (event: SyntheticEvent, newValue: RoomType | null) => {
    checkLogin()
    setRoomName(newValue)
    console.log(newValue)
  }

  const roomStyleHandleChange = (event: SyntheticEvent, newValue: CustomRadioImgData | null) => {
    checkLogin()
    dispatch(setPrompt({ prompt: newValue?.value }))
    console.log(newValue?.value)
    if (newValue) setSelected(newValue?.styleId)
  }

  useEffect(() => {
    if (genRoom) {
      console.log('generateroom')
      GenerateRoom()
    }
    console.log('genroom', genRoom)
    setGenRoom(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genRoom])

  const GenerateRoom = () => {
    checkLogin()
    if (inputPath) {
      setLoading(true)
      console.log('maskImage', maskImage)
      if (maskImage) {
        const res = uploadMaskService(maskImage)
        res
          .then(({ data }: any) => {
            setUpLoadMaskLink(data.url)
            console.log('mask link' + data.url)
            setMaskImage('')
          })
          .catch(error => {
            console.log(error)
            setShowError(true)
            setLoading(false)
          })
      } else {
        if (paintState) {
          const res = uploadNoneMask(width, height)
          res
            .then(({ data }: any) => {
              setUpLoadMaskLink(data.url)
              console.log('mask link' + data.url)
              setMaskImage('')
            })
            .catch(error => {
              setShowError(true)
              setLoading(false)
              console.log(error)
            })
        } else {
          generateRestyle()
        }
      }
    }
  }

  const generateRestyle = () => {
    console.log(uploadImageLink)
    if (uploadImageLink != '') {
      const name = 'newimage'
      const url = 'newurl'
      const res = generateRestyleImage(
        name,
        roomName,
        prompt.prompt,
        colorPrompt.colorPrompt,
        materialPrompt.materialPrompt,
        floorPrompt.floorPrompt,
        editPrompt,
        uploadImageLink,
        url
      )
      res
        .then(({ data }: any) => {
          if (data.state) {
            dispatch(setTempUrl({ tempUrl: data.genInfo }))
            setNewProject(data.genInfo)
            setShowImage(true)
          } else {
            setShowError(true)
          }
          setLoading(false)
        })
        .catch(error => {
          setShowError(true)
          setLoading(false)
          console.log(error)
        })
    }
  }

  const generateMaskRestyle = () => {
    console.log('paintStata', paintState)
    console.log('uploadImageLink', uploadImageLink)
    console.log('upLoadMaskLink', upLoadMaskLink)

    if (uploadImageLink != '' && upLoadMaskLink != '') {
      const name = 'mask restyle'
      const url = 'new mask restyle'
      const res = generateMaskRestyleImage(
        name,
        roomName,
        prompt.prompt,
        colorPrompt.colorPrompt,
        materialPrompt.materialPrompt,
        floorPrompt.floorPrompt,
        editPrompt,
        uploadImageLink,
        upLoadMaskLink,
        url,
        width,
        height
      )
      res
        .then(({ data }: any) => {
          if (data.state) {
            dispatch(setTempUrl({ tempUrl: data.genInfo }))
            setNewProject(data.genInfo)
            setShowImage(true)
          } else {
            setShowError(true)
          }
          setLoading(false)
        })
        .catch(error => {
          setShowError(true)
          setLoading(false)
          console.log(error)
        })
    }
  }

  const generateStaging = () => {
    if (uploadImageLink != '' && upLoadMaskLink != '') {
      const name = 'stagingImage'
      const url = 'newstagingImage'
      const res = generateStagingImage(
        name,
        roomName,
        prompt.prompt,
        colorPrompt.colorPrompt,
        materialPrompt.materialPrompt,
        floorPrompt.floorPrompt,
        editPrompt,
        uploadImageLink,
        upLoadMaskLink,
        url,
        width,
        height
      )
      res
        .then(({ data }: any) => {
          if (data.state) {
            dispatch(setTempUrl({ tempUrl: data.genInfo }))
            setNewProject(data.genInfo)
            setShowImage(true)
          } else {
            setShowError(true)
          }
          setLoading(false)
        })
        .catch(error => {
          setShowError(true)
          setLoading(false)
          console.log(error)
        })
    }
  }

  useEffect(() => {
    if (paintState) {
      generateStaging()
    } else {
      generateMaskRestyle()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upLoadMaskLink])

  useEffect(() => {
    if (uploadFlag) {
      setLoading(true)
      const res = uploadImageService(uploadImage, width, height)
      res
        .then(({ data }: any) => {
          console.log(data)
          setUploadImageLink(data.url)
          setLoading(false)
          setUploadFlag(false)
        })
        .catch(error => {
          setShowError(true)
          setLoading(false)
          console.log(error)
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadToggle])

  return (
    <Card
      sx={{
        height: '100%',
        '@media (min-width: 900px)': {
          height: 'calc(100vh - 270px)',
          overflowY: 'auto'
        }
      }}
      className='scroll'
    >
      <CardContent>
        <Box color={'#40F1FF'} borderRadius={1} border={2}>
          <Typography paddingX={2} paddingY={4} color={'white'} fontSize={'body2'} fontWeight={400}>
            画像をアップロードして、 “生成方法”,”部屋のタイプ”,”スタイルを選び” プロンプト(任意)を入力して、スタート
          </Typography>
        </Box>
        <Typography
          alignItems={'center'}
          justifyContent={'center'}
          display={'flex'}
          fontSize={'body2'}
          fontWeight={400}
          sx={{ mt: 6, mb: 4 }}
          color={'#40F1FF'}
        >
          早速スタートする{' '}
        </Typography>
        <FileUploaderSingle
          inputPath={inputPath}
          setInputPath={setInputPath}
          setUploadImage={setUploadImage}
          setUploadFlag={setUploadFlag}
        />
        <Grid item xs={12}>
          <Typography fontSize={'body2'} fontWeight={400} sx={{ mt: 2, mb: 2, pl: 2 }} color={'white'}>
            生成方法の選択
          </Typography>
          <ToggleButtonGroup
            exclusive
            value={paintState}
            onChange={handleAlignment}
            aria-label='text alignment'
            fullWidth
          >
            <ToggleButton value={false} aria-label='redesign'>
              <Typography sx={{ fontWeight: 500 }}>Re-デザイン</Typography>
            </ToggleButton>
            <ToggleButton value={true} aria-label='staging'>
              <Typography sx={{ fontWeight: 500 }}>ステージングプロ</Typography>
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={'body2'} fontWeight={400} sx={{ mt: 2, mb: 2, pl: 2 }} color={'white'}>
          部屋のタイプを選択
          </Typography>
          <Autocomplete
            sx={{ width: 'full', color: '#40F1FF' }}
            options={roomNameList}
            id='autocomplete-outlined'
            getOptionDisabled={option => option === roomNameList[5]}
            getOptionLabel={option => option.title || ''}
            renderInput={params => <TextField {...params} label='' sx={{ color: '#40F1FF' }} />}
            onChange={roomTypeHandleChange}
            ListboxProps={{
              className: 'scroll'
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={'body2'} fontWeight={400} sx={{ mt: 2, mb: 2, pl: 2 }} color={'white'}>
            部屋のスタイルを選択
          </Typography>
          <Autocomplete
            sx={{ width: 'full', color: '#40F1FF' }}
            options={designStyle}
            id='autocomplete-outlined1'
            getOptionLabel={option => option.title || ''}
            renderInput={params => <TextField {...params} label='' sx={{ color: '#40F1FF' }} />}
            onChange={roomStyleHandleChange}
            ListboxProps={{
              className: 'scroll'
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={'body2'} fontWeight={400} sx={{ mt: 2, mb: 2, pl: 2 }} color={'white'}>
            カラーから選択(複数選択可)
          </Typography>
          <TextField
            onClick={() => setColorOpen(true)}
            maxRows={1}
            value={colorTitle.colorTitle}
            label=''
            id='textarea-outlined-controlled'
            sx={{ width: '100%', color: '#40F1FF' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={'body2'} fontWeight={400} sx={{ mt: 2, mb: 2, pl: 2 }} color={'white'}>
            フロア材から選択(複数選択可)
          </Typography>
          <TextField
            onClick={() => setFloorOpen(true)}
            maxRows={1}
            value={floorTitle.floorTitle}
            label=''
            id='textarea-outlined-controlled'
            sx={{ width: '100%', color: '#40F1FF' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={'body2'} fontWeight={400} sx={{ mt: 2, mb: 2, pl: 2 }} color={'white'}>
            マテリアルから選択(複数選択可)
          </Typography>
          <TextField
            onClick={() => setMaterialOpen(true)}
            maxRows={1}
            value={materialTitle.materialTitle}
            label=''
            id='textarea-outlined-controlled'
            sx={{ width: '100%', color: '#40F1FF' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={'body2'} fontWeight={400} sx={{ mt: 2, mb: 2, pl: 2 }} color={'white'}>
            プロンプトを入力(任意)
          </Typography>
          <TextField
            multiline
            maxRows={4}
            value={editPrompt}
            label=''
            onChange={handleChange}
            id='textarea-outlined-controlled'
            sx={{ width: '100%', color: '#40F1FF' }}
          />
        </Grid>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 3
          }}
        >
          <Button
            variant='contained'
            sx={{ paddingY: 2, paddingX: 10, borderRadius: 5 }}
            onClick={() => setGenRoom(true)}
          >
            送信
          </Button>
        </Box>
      </CardContent>
      <Loading open={loading} />
      <ShowResultModal
        open={showImage}
        setOpen={setShowImage}
        project={newProject}
        setUploadImageLink={setUploadImageLink}
        setInputPath={setInputPath}
        setOpenEditModal={setOpenEditModal}
        setGenRoom={setGenRoom}
      />
      <ErrorModal open={showError} setOpen={setShowError} setGenRoom={setGenRoom} />
      <ColorModal open={colorOpen} setOpen={setColorOpen} />
      <FloorModal open={floorOpen} setOpen={setFloorOpen} />
      <MaterialModal open={materialOpen} setOpen={setMaterialOpen} />
    </Card>
  )
}

export default Input
