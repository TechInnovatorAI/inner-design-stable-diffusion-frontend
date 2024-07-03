// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import MuiCard, { CardProps } from '@mui/material/Card'
import OutlinedInput from '@mui/material/OutlinedInput'
import {
  styled

  // useTheme
} from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** interface
import { ValidateInterface } from 'src/context/types'

// ** Demo Imports

import * as yup from 'yup'
import { useAuth } from 'src/hooks/useAuth'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import FormHelperText from '@mui/material/FormHelperText'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(8)
})

const defaultValues = {
  username: '',
  password: '',
  email: ''
}

interface FormData {
  username: string
  email: string
  password: string
}

const Register = () => {
  const [validate, setValidate] = useState<ValidateInterface>({
    upper: true,
    lower: true,
    number: true,
    special: true,
    length: true
  })

  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // ** Hooks
  // const theme = useTheme()
  const auth = useAuth()

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

  function handleValidate(password: string) {
    const uppercaseRegex = /[A-Z]/
    const hasUppercase = uppercaseRegex.test(password)

    // Check for at least one lowercase letter
    const lowercaseRegex = /[a-z]/
    const hasLowercase = lowercaseRegex.test(password)

    // Check for at least one special character
    const specialRegex = /[!@#$%^&*(),.?":{}|<>]/
    const hasSpecialChar = specialRegex.test(password)

    // Check for at least one number
    const numberRegex = /[0-9]/
    const hasNumber = numberRegex.test(password)

    setValidate(prev => {
      const newValidate = { ...prev }
      newValidate.upper = hasUppercase
      newValidate.lower = hasLowercase
      newValidate.special = hasSpecialChar
      newValidate.number = hasNumber
      newValidate.length = password.length >= 8

      return newValidate
    })

    return {
      upper: hasUppercase,
      lower: hasLowercase,
      number: hasNumber,
      special: hasSpecialChar,
      length: password.length >= 8
    }
  }

  const onSubmit = async (data: FormData) => {
    const { username, email, password } = data

    const resValidate: ValidateInterface = await handleValidate(password)
    console.log(resValidate)
    if (!resValidate.length) {
      console.log('validate.length', resValidate.length)

      return
    } else if (!resValidate.lower) {
      console.log('validate.lower', resValidate.lower)

      return
    } else if (!resValidate.number) {
      console.log('validate.number', resValidate.number)

      return
    } else if (!resValidate.special) {
      console.log('validate.special', resValidate.special)

      return
    } else if (!resValidate.upper) {
      console.log('validate.upper', resValidate.upper)

      return
    } else {
      console.log('true')
      auth.register({ username, email, password }, () => {
        setError('email', {
          type: 'manual',
          message: 'メールアドレスまたはパスワードが無効です'
        })
      })
    }
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(15.5, 7, 6.5)} !important` }}>
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
                lineHeight: 2,
                fontWeight: 700,
                fontSize: '2rem !important',
                color: 'white'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            <Typography variant='h6' sx={{ mb: 1.5, letterSpacing: '0.18px', fontWeight: 500, color: 'white' }}>
              新規会員登録
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='username'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    autoFocus
                    label='ユーザー名'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.username)}
                    placeholder='yamada'
                  />
                )}
              />
              {/* {errors.username && (
                <FormHelperText sx={{ color: 'error.main' }}>
                  {errors.username.message}
                </FormHelperText>
              )} */}
            </FormControl>
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
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
              パスワード
              </InputLabel>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <OutlinedInput
                    value={value}
                    onBlur={onBlur}
                    label='パスワード'
                    onChange={onChange}
                    id='auth-login-v2-password'
                    error={Boolean(errors.password)}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onMouseDown={e => e.preventDefault()}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {/* {errors.password && ( */}
              {!validate.length || !validate.upper || !validate.lower || !validate.lower || !validate.special ? (
                <FormHelperText sx={{ color: 'error.main' }} id=''>
                  パスワードは、トータル８文字以上 英語大文字,小文字、特殊文字を含めてください。
                </FormHelperText>
              ) : (
                <></>
              )}
              {/* {!validate.upper && (
                <FormHelperText sx={{ color: 'error.main' }} id=''>
                  パスワードは、トータル８文字以上
英語大文字,小文字、特殊文字を含めてください。
                </FormHelperText>
              )}
              {!validate.lower && (
                <FormHelperText sx={{ color: 'error.main' }} id=''>
                  英語の小文字を含む。
                </FormHelperText>
              )}
              {!validate.number && (
                <FormHelperText sx={{ color: 'error.main' }} id=''>
                  水資を含む。
                </FormHelperText>
              )}
              {!validate.special && (
                <FormHelperText sx={{ color: 'error.main' }} id=''>
                  特殊記号を含む。
                </FormHelperText>
              )} */}
              {/* )} */}
            </FormControl>

            <FormControlLabel
              control={<Checkbox />}
              sx={{
                mb: 4,
                mt: 1.5,
                '& .MuiFormControlLabel-label': { fontSize: '0.875rem' }
              }}
              label={
                <>
                  <Typography variant='body2' component='span'>
                    同意します{' '}
                  </Typography>
                  <LinkStyled href='/' onClick={e => e.preventDefault()}>
                    プライバシー ポリシーと利用規約
                  </LinkStyled>
                </>
              }
            />
            <Button fullWidth size='large' type='submit' variant='contained' sx={{ mb: 7 }}>
            サインアップ
            </Button>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 2
              }}
            >
              <Typography sx={{ color: 'white' }}>すでにアカウントをお持ちですか？</Typography>
              <Button
                variant='outlined'
                href='/auth/login'
                component={Link}
                size='small'
                sx={{ mb: 7, borderRadius: 5, background: 'white', color: '#666CFF' }}
              >
                ログイン
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
