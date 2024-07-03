// ** React Imports
import { ReactNode } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import MuiCard, { CardProps } from '@mui/material/Card'
import Box from '@mui/material/Box'
import {
  styled

  // useTheme
} from '@mui/material/styles'

// import FormHelperText from '@mui/material/FormHelperText'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks

// ** Demo Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from 'src/hooks/useAuth'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  '& svg': { mr: 1.5 },
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main
}))

const schema = yup.object().shape({
  email: yup.string().email().required()
})

const defaultValues = {
  email: ''
}
interface FormData {
  email: string
}

const ForgotPassword = () => {
  const auth = useAuth()

  // ** Hooks
  // const theme = useTheme()

  // ** Vars
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    const { email } = data
    console.log(email)
    auth.forgotpassword({ email }, () => {
      setError('email', {
        type: 'manual',
        message: 'メールアドレスまたはパスワードが無効です'
      })
    })
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 8)} !important` }}>
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
          <Box sx={{ mb: 6.5 }}>
            <Typography variant='h5' sx={{ mb: 1.5, letterSpacing: '0.18px', fontWeight: 600 }}>
              パスワードをお忘れですか？ 🔒
            </Typography>
            <Typography variant='body2'>
              ご登録いただいたメールアドレスから &prime;パスワードの再発行をしてください。
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    autoFocus
                    label='Eメール'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder='admin@getrestyle.com'
                  />
                )}
              />
              {/* {errors.email && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {errors.email.message}
                </FormHelperText>
              )} */}
            </FormControl>
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 5.25 }}>
              パスワードの再発行
            </Button>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <LinkStyled href='/auth/login'>
                <Icon icon='mdi:chevron-left' fontSize='2rem' />
                <span>ログインに戻る</span>
              </LinkStyled>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

ForgotPassword.guestGuard = true
ForgotPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ForgotPassword
