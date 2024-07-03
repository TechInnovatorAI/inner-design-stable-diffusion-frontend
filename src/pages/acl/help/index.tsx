// ** MUI Imports
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'

const helpPage = () => {
  // const ability = useContext(AbilityContext)

  return (
    <Grid container spacing={6} justifyContent={'center'}>
      <Grid item xs={12} md={8} lg={6} sx={{ textIndent: '40px' }}>
        <Typography sx={{ textAlign: 'center', py: 12 }} variant='h4'>
          About this service
        </Typography>
        <Typography pb={3} sx={{ textIndent: '40px' }}>
          Our service, "Findshowcase," was created to utilize the remarkable progress of recent AI technology to propose "home staging" and "renovation" in the interior design field.
        </Typography>
        <Typography pb={3}>
          Originally, it took a lot of time to coordinate outfits, but now this service uses "image generation AI" to help you upload an image, select the type and style of the room, and then by following the specified prompts (instructions that are like spells), you can experience coordinated image suggestions in just a short amount of time.
        </Typography>
        <Typography pb={3}>
          Of course, generative AI is still a developing technology, so the results displayed may not be what you expect or may not match your imagination.
        </Typography>
        <Typography pb={3}>
          In such cases, you can either regenerate it or use the "mask function" - one of the features of "Restyle" - to fill in and generate the area or object you want to generate, which will give you new ideas and inspiration.
        </Typography>
        <Typography pb={3}>
          We will continue to use this AI as a tool to provide you with fun, convenient, and useful services.
        </Typography>
        <Typography pb={3}>Please stay tuned.</Typography>
      </Grid>
    </Grid>
  )
}

helpPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default helpPage
