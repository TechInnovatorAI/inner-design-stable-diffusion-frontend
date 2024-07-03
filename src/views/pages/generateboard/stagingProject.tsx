import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Card, Grid, Typography } from '@mui/material'

import { getStagingProject } from 'src/pages/api/dashboardService'
import StagingImageThumnail from 'src/views/components/stagingImageThumnail'

const StagingProject = () => {
  const [generatedImage, setGeneratedImage] = useState<any>([])

  const tempUrl = useSelector((state: any) => state.tempUrl)

  useEffect(() => {
    const loginuserData = JSON.parse(localStorage.getItem('userData') as string) || null
    if (loginuserData != null) {
      // console.log('click the gen button')
      let userId: any = 0
      if (loginuserData) {
        userId = loginuserData.id
      }

      const res = getStagingProject(userId)
      res
        .then(({ data }: any) => {
          setGeneratedImage(data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [])

  useEffect(() => {
    if (tempUrl.tempUrl != '') {
      const prev = [...generatedImage]
      const new_url = [tempUrl.tempUrl].concat(prev)
      setGeneratedImage(new_url)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempUrl])

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
      {Array.isArray(generatedImage) && generatedImage.length ? (
        generatedImage.map((item: any, i: number) => (
          <Grid sx={{ display: 'flex', gap: 3, justifyContent: 'space-around', mt: 2 }} key={i}>
            {item.baseUrl ? <StagingImageThumnail imageUrl={item.baseUrl} /> : <></>}
            {item.url[0] ? <StagingImageThumnail imageUrl={item.url[0]} /> : <></>}
          </Grid>
        ))
      ) : (
        <Typography variant='h6'>新しいデザインの作成</Typography>
      )}
    </Card>
  )
}

export default StagingProject
