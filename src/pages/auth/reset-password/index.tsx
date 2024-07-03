// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
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

// ** Hooks

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
  password: yup.string().required().min(8),
  confirmpassword: yup.string().required().min(8)
})

const defaultValues = {
  password: '',
  confirmpassword: ''
}

interface FormData {
  password: string
  confirmpassword: string
}

interface ValidateInterface {
  upper: boolean
  lower: boolean
  number: boolean
  special: boolean
  length: boolean
}

const ResetPassword = () => {
  const [equre, setEqure] = useState(true)
  const [validate, setValidate] = useState<ValidateInterface>({
    upper: true,
    lower: true,
    number: true,
    special: true,
    length: true
  })

  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

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
      newValidate.upper = true
      newValidate.lower = true
      newValidate.special = true
      newValidate.number = true
      newValidate.length = true

      return newValidate
    })

    setValidate(prev => {
      const newValidate = { ...prev }
      newValidate.upper = hasUppercase
      newValidate.lower = hasLowercase
      newValidate.special = hasSpecialChar
      newValidate.number = hasNumber
      newValidate.length = password.length >= 8

      return newValidate
    })
    console.log(validate)
  }

  const onSubmit = async (data: FormData) => {
    setEqure(true)
    const { password, confirmpassword } = data
    console.log(data)
    if (password != confirmpassword) {
      setEqure(false)

      return false
    }
    await handleValidate(password)
    if (!validate.length) {
      console.log('validate.length', validate.length)

      return
    } else if (!validate.lower) {
      console.log('validate.lower', validate.lower)

      return
    } else if (!validate.number) {
      console.log('validate.number', validate.number)

      return
    } else if (!validate.special) {
      console.log('validate.special', validate.special)

      return
    } else if (!validate.upper) {
      console.log('validate.upper', validate.upper)

      return
    } else {
      console.log('true')
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      const accessToken: any = urlParams.get('accessToken') || null
      auth.resetpassword({ password, accessToken }, () => {
        setError('password', {
          type: 'manual',
          message: 'メールアドレスまたはパスワードが無効です'
        })
      })
    }
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
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ mb: 1.5, letterSpacing: '0.18px', fontWeight: 600 }}>
              パスワードを再設定する 🔒
            </Typography>
            <Typography variant='body2'>新しいパスワードは以前に使用したパスワードとは異なる必要があります</Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
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
                    label='新しいパスワード'
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
            </FormControl>
            <FormControl fullWidth sx={{ mt: 4 }}>
              <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.confirmpassword)}>
                パスワードを再入力する
              </InputLabel>
              <Controller
                name='confirmpassword'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <OutlinedInput
                    value={value}
                    onBlur={onBlur}
                    label='パスワードを再入力する'
                    onChange={onChange}
                    id='auth-login-v2-password'
                    error={Boolean(errors.confirmpassword)}
                    type={showConfirmPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onMouseDown={e => e.preventDefault()}
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          <Icon icon={showConfirmPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {/* {errors.password && ( */}
              {!equre && (
                <FormHelperText sx={{ color: 'error.main' }} id=''>
                  新しいパスワードと確認パスワードは同じでなければなりません。
                </FormHelperText>
              )}
              {!validate.length && (
                <FormHelperText sx={{ color: 'error.main' }} id=''>
                  パスワードの長さ8〜30を入力してください。
                </FormHelperText>
              )}
              {!validate.upper && (
                <FormHelperText sx={{ color: 'error.main' }} id=''>
                  英語大文字を含む。
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
              )}
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
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              <Typography sx={{ mr: 2, color: 'text.secondary' }}>すでにアカウントをお持ちですか？</Typography>
              <Typography href='/auth/login' component={Link} sx={{ color: 'primary.main', textDecoration: 'none' }}>
                代わりにサインインしてください
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

ResetPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

ResetPassword.guestGuard = true

export default ResetPassword
