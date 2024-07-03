import { Grid, Typography } from '@mui/material'
import { toast } from 'react-hot-toast'
import ImageThumnail from '../imageThumnail'

const FileuploadSingle = ({
  inputPath,
  setInputPath,
  setUploadImage,
  setUploadFlag
}: {
  inputPath: string
  setInputPath: (string: string) => void
  setUploadImage: (File: File) => void
  setUploadFlag: (boolean: boolean) => void
}) => {
  const fileToDataUri = (field: any) => {
    return new Promise(resolve => {
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        resolve(reader.result)
      })

      reader.readAsDataURL(field)
    })
  }

  const handleuploadImage = async (e: any) => {
    const fileObj: any = e.target.files[0]

    if (fileObj && fileObj.size < 30000) {
      toast.error('This file format is not permitted. Files over 3MB in size are supported.')

      return false
    }

    let imgUrl: any
    if (fileObj) {
      imgUrl = URL.createObjectURL(fileObj)
      const image: any = document.createElement('img')
      image.src = await fileToDataUri(fileObj)
      setUploadFlag(true)
      setUploadImage(fileObj)
      setInputPath(imgUrl)
    } else {
      setInputPath('')
    }
  }

  return (
    <Grid>
      <input
        onChange={e => {
          handleuploadImage(e)
        }}
        name='uploadImage'
        id='uploadImage'
        type='file'
        hidden
        accept='.png, .jpg, .jpeg'
      />
      <label htmlFor='uploadImage'>
        <Grid border={'dashed'} sx={{ borderWidth: 2, borderRadius: 1, position: 'relative' }} minHeight={180}>
          {inputPath == '' ? <></> : <ImageThumnail imageUrl={inputPath} />}
          <Typography
            sx={{
              position: 'absolute',
              right: '50%',
              transform: 'translate(50%)',
              top: '50%'
            }}
            alignItems={'center'}
            right={1 / 2}
            bottom={1 / 2}
          >
            Image upload
          </Typography>
        </Grid>
      </label>
    </Grid>
  )
}

export default FileuploadSingle
