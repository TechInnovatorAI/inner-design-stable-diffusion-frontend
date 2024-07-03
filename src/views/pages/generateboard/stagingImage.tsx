import { ChangeEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Card, Grid, Typography } from '@mui/material'

import { getAllProject, getStagingProject } from 'src/pages/api/dashboardService'
import OriginRadioImg from 'src/views/components/custom-radio/originImage'
import { ProjectInterface } from 'src/context/types'
import ShowResult from 'src/views/components/showResult'
import { timeFormat } from 'src/views/utils/timeFormat'

const StagingImage = ({
  setUploadImageLink,
  setInputPath,
  setOpenEditModal,
  setGenRoom
}: {
  setUploadImageLink: (string: string) => void
  setInputPath: (string: string) => void
  setOpenEditModal: (boolean: boolean) => void
  setGenRoom: (boolean: boolean) => void
}) => {
  const [generatedImage, setGeneratedImage] = useState<any>([])

  const tempUrl = useSelector((state: any) => state.tempUrl)
  const paintState = useSelector((state: any) => state.paintState)
  const [selected, setSelected] = useState<number>(0)
  const [projectItem, setProjectItem] = useState<ProjectInterface>({
    id: 1,
    name: 'name',
    userId: 2,
    prompt: 'how',
    baseUrl: 'url',
    url: ['1'],
    createdAt: '',
    method: 'restyle'
  })

  useEffect(() => {
    const loginuserData = JSON.parse(localStorage.getItem('userData') as string) || null
    console.log(paintState, '121212121221212')
    if (loginuserData != null) {
      let userId: any = 0
      if (loginuserData) {
        userId = loginuserData.id
      }

      const res = getStagingProject(userId)
      res
        .then(({ data }: any) => {
          setGeneratedImage(data)
          console.log(data[0].id)
          setProjectItem(data[0])
          setSelected(0)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      const res = getAllProject()
      res
        .then(({ data }: any) => {
          setGeneratedImage(data)
        })
        .catch(error => {
          console.log(error)
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (tempUrl.tempUrl != '') {
      const prev = [...generatedImage]
      const new_url = [tempUrl.tempUrl].concat(prev)
      setGeneratedImage(new_url)
      setProjectItem(new_url[0])
      setSelected(0)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempUrl])

  const handleChange = (prop: number | ChangeEvent<HTMLInputElement>) => {
    if (typeof prop === 'number') {
      setSelected(prop)
    } else {
      // setSelected((prop.target as HTMLInputElement).value)
    }
  }

  useEffect(() => {
    setProjectItem(generatedImage[selected])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <Card
      sx={{
        height: '100%',
        '@media (min-width: 900px)': {
          height: 'calc(100vh - 270px)'
        }
      }}
      className='scroll'
    >
      <Grid container item spacing={1}>
        {generatedImage.length ? (
          <>
            <Grid
              container
              md={2}
              overflow={{ xs: 'scroll' }}
              gap={1}
              flexWrap={{ xs: 'nowrap', md: 'wrap' }}
              justifyContent={{ xs: 'normal' }}
              padding={1}
              className='scroll'
              sx={{
                height: '100%',
                '@media (min-width: 900px)': {
                  height: 'calc(100vh - 270px)',
                  overflowY: 'auto'
                },
                '@media (max-width: 899px)': {
                  height: '270px',
                  overflowX: 'auto'
                }
              }}
            >
              <Typography
                sx={{
                  color: 'white',
                  position: 'sticky',
                  top: 0,
                  background: '#000000',
                  width: '100%',
                  textAlign: 'center',
                  opacity: 0.9,
                  padding: 2,
                  zIndex: 1,
                  borderWidth: 1,
                  borderBottomRightRadius: 1,
                  borderBottomLeftRadius: 1
                }}
                variant='body2'
              >
                オリジナル画像
              </Typography>
              {generatedImage.map((item: any, i: number) => (
                <OriginRadioImg
                  key={i}
                  index={i}
                  name={'origin-radio-img'}
                  selected={selected}
                  data={{
                    alt: item.name,
                    value: item.id,
                    prompt: item.prompt,
                    img: item.baseUrl,
                    isSelected: undefined
                  }}
                  handleChange={handleChange}
                />
              ))}
            </Grid>
            <Grid
              item
              sm={12}
              md={9}
              lg={10}
              order={1}
              sx={{
                height: '100%',
                '@media (min-width: 900px)': {
                  height: 'calc(100vh - 270px)',
                  overflowY: 'auto'
                }
              }}
              className='scroll'
            >
              <Typography
                sx={{
                  color: 'white',
                  position: 'sticky',
                  top: 0,
                  background: '#000000',
                  width: '100%',
                  textAlign: 'center',
                  opacity: 0.9,
                  padding: 2,
                  zIndex: 1,
                  borderWidth: 1,
                  borderBottomRightRadius: 1,
                  borderBottomLeftRadius: 1
                }}
                variant='body2'
              >
                生成イメージ
              </Typography>
              <Grid item xs={12}>
                <Typography fontSize={'body3'} fontWeight={600} sx={{ mt: 2, mb: 2, pl: 2 }} color={'white'}>
                  日時
                </Typography>
                <Typography fontSize={'body1'} fontWeight={400} sx={{ mt: 2, mb: 2, pl: 2 }} color={'white'}>
                  {timeFormat(projectItem?.createdAt)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography fontSize={'body3'} fontWeight={600} sx={{ mt: 2, mb: 2, pl: 2 }} color={'white'}>
                  プロンプト
                </Typography>
                <Typography fontSize={'body1'} fontWeight={400} sx={{ mt: 2, mb: 2, pl: 2 }} color={'white'}>
                  {projectItem?.prompt}
                </Typography>
              </Grid>
              <ShowResult
                project={projectItem}
                setUploadImageLink={setUploadImageLink}
                setInputPath={setInputPath}
                setOpenEditModal={setOpenEditModal}
                setGenRoom={setGenRoom}
              />
            </Grid>
          </>
        ) : (
          <>
            <Typography variant='h6'>新しいデザインの作成</Typography>
          </>
        )}
      </Grid>
    </Card>
  )
}

export default StagingImage
