// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import ProjectContent from 'src/views/pages/my-project/projectContent'
import { useSearchParams } from 'next/navigation'
import { toInteger } from 'lodash'

const MyProjectPage = () => {
  const searchParams = useSearchParams()
  const userId = toInteger(searchParams.get('id'))
  const userName = searchParams.get('name')
  console.log('userId', userId)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={userName ? userName + 'のプロジェクト' : 'マイプロジェクト'}></CardHeader>
          <CardContent>
            <ProjectContent userId={userId} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

MyProjectPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default MyProjectPage
