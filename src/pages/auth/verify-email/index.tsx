// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import MuiCard, { CardProps } from '@mui/material/Card'
import {
  styled

  // useTheme
} from '@mui/material/styles'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import { useAuth } from 'src/hooks/useAuth'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginLeft: theme.spacing(1),
  color: theme.palette.primary.main
}))

const VerifyEmail = () => {
  const auth = useAuth()

  // ** Hooks
  // const theme = useTheme()
  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const tokenParam: any = urlParams.get('accessToken') || null
    if (tokenParam) {
      console.log(tokenParam)
      auth.verifyemail({ tokenParam })
    }
    console.log('verify-email page')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 9)} !important` }}>
          <Box
            sx={{
              mb: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography
              variant='h6'
              sx={{
                ml: 2,
                lineHeight: 3,
                fontWeight: 700,
                fontSize: '2rem !important',
                color: 'white'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 8 }}>
            <Typography variant='body1' sx={{ mb: 2, color: 'white' }}>
              ご登録されたメールアドレスをご確認ください。
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>(届いていない場合、迷惑メールもご確認ください。)</Typography>
          </Box>
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography sx={{ color: 'text.secondary' }}>メールが届きませんでしたか?</Typography>
            <LinkStyled href='#' onClick={e => e.preventDefault()}>
              再送する
            </LinkStyled>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

VerifyEmail.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

VerifyEmail.guestGuard = true

export default VerifyEmail
