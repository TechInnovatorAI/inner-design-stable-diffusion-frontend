// ** React Imports
import { useState, useEffect, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import UserSuspendDialog from 'src/views/components/userSuspendDialog'

// import UserSubscriptionDialog from

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType, updateProfileInterface } from 'src/context/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** API
import { getProfile, updateProfile } from 'src/pages/api/accountService'

// ** Interface
import { profileValidationInterface } from 'src/context/types'
import Link from 'next/link'
import { uploadAvatarService } from '../api/dashboardService'
import { useAuth } from 'src/hooks/useAuth'

interface ColorsType {
  [key: string]: ThemeColor
}

const roleColors: ColorsType = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const statusColors: ColorsType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** Styled <sub> component
// const Sub = styled('sub')({
//   fontWeight: 300,
//   fontSize: '1rem',
//   alignSelf: 'flex-end'
// })

const Profile = () => {
  // ** States
  const auth = useAuth()
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)
  const [profile, setProfile] = useState<UsersType>()
  const firstnmaeRef = useRef<any>()
  const lastnameRef = useRef<any>()
  const addressRef = useRef<any>()
  const phoneNumberRef = useRef<any>()

  // Handle Edit dialog
  const handleEditClickOpen = () => {
    setValidate(prev => {
      const newValidate = { ...prev }
      newValidate.firstName = true
      newValidate.lastName = true
      newValidate.address = true
      newValidate.phoneNumber = true

      return newValidate
    })
    setOpenEdit(true)
  }
  const handleEditClose = () => setOpenEdit(false)

  const [validate, setValidate] = useState<profileValidationInterface>({
    firstName: true,
    lastName: true,
    address: true,
    phoneNumber: true
  })

  // const [typeValidate, setTypeValidate] = useState<profileValidationInterface>({
  //   firstName: true,
  //   lastName: true,
  //   address: true,
  //   phoneNumber: true
  // })

  const handleUpdate = async () => {
    const firstname = firstnmaeRef.current && firstnmaeRef.current.value
    const lastname = lastnameRef.current && lastnameRef.current.value
    const address = addressRef.current && addressRef.current.value
    const phoneNumber = phoneNumberRef.current && phoneNumberRef.current.value
    setValidate(prev => {
      const newValidate = { ...prev }
      newValidate.firstName = true
      newValidate.lastName = true
      newValidate.address = true
      newValidate.phoneNumber = true

      return newValidate
    })

    // setTypeValidate(prev => {
    //   const newValidate = { ...prev }
    //   newValidate.firstName = true
    //   newValidate.lastName = true
    //   newValidate.address = true
    //   newValidate.phoneNumber = true

    //   return newValidate
    // })

    if (!lastname) {
      setValidate(prev => {
        const newValidate = { ...prev }
        newValidate.lastName = false

        return newValidate
      })
      lastnameRef.current.focus()
    } else if (!firstname) {
      setValidate(prev => {
        const newValidate = { ...prev }
        newValidate.firstName = false

        return newValidate
      })
      firstnmaeRef.current.focus()
    } else if (!address) {
      setValidate(prev => {
        const newValidate = { ...prev }
        newValidate.address = false

        return newValidate
      })
      addressRef.current.focus()
    } else if (!phoneNumber) {
      setValidate(prev => {
        const newValidate = { ...prev }
        newValidate.phoneNumber = false

        return newValidate
      })
      phoneNumber.current.focus()
    } else {
      const data: updateProfileInterface = {
        lastname: lastname,
        firstname: firstname,
        address: address,
        phoneNumber: phoneNumber
      }
      const res = updateProfile(data)
      handleEditClose()
      res
        .then(({ data }: any) => {
          setProfile(data)
          auth.setUser(data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const uploadAvatar = (e: any) => {
    const fileObj: any = e.target.files[0]
    if (fileObj) {
      const res = uploadAvatarService(fileObj)
      res
        .then(({ data }: any) => {
          setProfile(data)
          auth.setUser(data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  useEffect(() => {
    const res = getProfile()
    res
      .then(({ data }: any) => {
        setProfile(data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  if (profile) {
    return (
      <Grid container xs={12} justifyContent={'center'}>
        <Grid item sm={8} md={6} lg={4} mt={10}>
          <Card>
            <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {profile.avatar ? (
                <>
                  <label htmlFor='uploadAvatar'>
                    <CustomAvatar
                      src={profile.avatar}
                      variant='rounded'
                      alt={profile.firstname + profile.lastname}
                      sx={{ width: 120, height: 120, fontWeight: 600, mb: 4 }}
                    />
                  </label>
                  <input
                    onChange={e => uploadAvatar(e)}
                    name='uploadAvatar'
                    id='uploadAvatar'
                    type='file'
                    hidden
                    accept='.png, .jpg, jpeg'
                  />
                </>
              ) : (
                <>
                  <label htmlFor='uploadAvatar'>
                    <CustomAvatar
                      skin='light'
                      variant='rounded'
                      color={'primary'}
                      sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
                    >
                      {getInitials(profile.firstname + ' ' + profile.lastname)}
                    </CustomAvatar>
                  </label>
                  <input
                    onChange={e => uploadAvatar(e)}
                    name='uploadAvatar'
                    id='uploadAvatar'
                    type='file'
                    hidden
                    accept='.png, .jpg, jpeg'
                  />
                </>
              )}
              {profile.firstname && (
                <Typography variant='h6' sx={{ mb: 2 }}>
                  {profile.firstname + profile.lastname}
                </Typography>
              )}
              <CustomChip
                skin='light'
                size='small'
                label={profile.role}
                color={roleColors[profile.role]}
                sx={{
                  height: 20,
                  fontWeight: 600,
                  borderRadius: '5px',
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { mt: -0.25 }
                }}
              />
            </CardContent>

            <CardContent sx={{ my: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ mr: 8, display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
                    <Icon icon='mdi:check' />
                  </CustomAvatar>
                  <div>
                    <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                      {profile.paymentAmount + ' 円'}
                    </Typography>
                    <Typography variant='body2'>残りの料金</Typography>
                  </div>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatar skin='light' variant='rounded' sx={{ mr: 3 }}>
                    <Icon icon='mdi:briefcase-variant-outline' />
                  </CustomAvatar>
                  <div>
                    <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                      {profile.genNumber}
                    </Typography>
                    <Typography variant='body2' component={Link} href={'/acl'} sx={{ textDecoration: 'none' }}>
                      画像生成枚数
                    </Typography>
                  </div>
                </Box>
              </Box>
            </CardContent>

            <CardContent>
              <Typography variant='h6'>アカウント</Typography>
              <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
              <Box sx={{ pt: 2, pb: 1 }}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    ユーザー名:
                  </Typography>
                  <Typography variant='body2'>@{profile.name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    メールアドレス:
                  </Typography>
                  <Typography variant='body2'>{profile.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    状態:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={profile.status}
                    color={statusColors[profile.status]}
                    sx={{
                      height: 20,
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      borderRadius: '5px',
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>役割:</Typography>
                  <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                    {profile.role}
                  </Typography>
                </Box>
                {profile.address && (
                  <Box sx={{ display: 'flex', mb: 2.7 }}>
                    <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>住所:</Typography>
                    <Typography variant='body2'>{profile.address}</Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>電話番号:</Typography>
                  <Typography variant='body2'>+81 {profile.phoneNumber}</Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                編集
              </Button>
            </CardActions>

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              aria-describedby='user-view-edit-description'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
            >
              <DialogTitle
                id='user-view-edit'
                sx={{
                  textAlign: 'center',
                  fontSize: '1.5rem !important',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                ユーザー情報の編集
              </DialogTitle>
              <DialogContent
                sx={{
                  pb: theme => `${theme.spacing(8)} !important`,
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
                }}
              >
                <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  登録されている内容をご確認ください。
                </DialogContentText>
                <form>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='(姓)' defaultValue={profile.lastname} inputRef={lastnameRef} />
                      {!validate.lastName && <Typography color={'#FF4D49'}>姓を入力してください。</Typography>}
                      {/* {!typeValidate.lastName && (
                        <Typography color={'#FF4D49'}>漢字の名前を入力してください。</Typography>
                      )} */}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='(名)' defaultValue={profile.firstname} inputRef={firstnmaeRef} />
                      {!validate.firstName && <Typography color={'#FF4D49'}>名を入力してください。</Typography>}
                      {/* {!typeValidate.firstName && (
                        <Typography color={'#FF4D49'}>漢字の名前を入力してください。</Typography>
                      )} */}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='住所'
                        defaultValue={profile.address}
                        inputRef={addressRef}
                        placeholder='〒100-0000 東京都千代田区千代田1-1-1'
                      />
                      {!validate.address && <Typography color={'#FF4D49'}>住所を入力してください。</Typography>}
                      {/* {!typeValidate.address && (
                        <Typography color={'#FF4D49'}>
                          アドレス形式が正しくありません。<strong>〒100-0000 東京都千代田区千代田1-1-1</strong>
                        </Typography>
                      )} */}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='電話番号'
                        defaultValue={`${profile.phoneNumber}`}
                        inputRef={phoneNumberRef}
                        placeholder='+81 (03) 1234-5678'
                      />
                      {!validate.phoneNumber && <Typography color={'#FF4D49'}>電話番号を入力してください</Typography>}
                      {/* {!typeValidate.phoneNumber && (
                        <Typography color={'#FF4D49'}>
                          電話番号の形式が正しくありません。<strong>+81 (03) 1234-5678</strong>
                        </Typography>
                      )} */}
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions
                sx={{
                  justifyContent: 'center',
                  px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
                  pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
                }}
              >
                <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                  キャンセル
                </Button>
                <Button variant='contained' sx={{ mr: 2 }} onClick={handleUpdate}>
                  保存
                </Button>
              </DialogActions>
            </Dialog>

            <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} />
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

Profile.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default Profile
