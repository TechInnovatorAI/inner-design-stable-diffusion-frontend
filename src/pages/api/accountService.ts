import axios from 'axios'
import api from 'src/configs/api'
import auth from 'src/configs/auth'

import { updateProfileInterface } from 'src/context/types'

const getProfile = async () => {
  const loginuserData = JSON.parse(<any>localStorage.getItem('userData')) || null
  const accesstoken = <any>localStorage.getItem('accessToken') || null
  if (loginuserData != null) {
    const data = {
      email: loginuserData.email
    }
    const config = {
      method: 'post',
      url: api.API + auth.meEndpoint,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accesstoken
      },
      data: data
    }

    return axios(config)
  }
}

const updateProfile = async (data: updateProfileInterface) => {
  const loginuserData = JSON.parse(<any>localStorage.getItem('userData')) || null
  const accesstoken = <any>localStorage.getItem('accessToken') || null
  if (loginuserData != null) {
    const config = {
      method: 'patch',
      url: api.API + api.Profile + loginuserData.id,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accesstoken
      },
      data: data
    }

    return axios(config)
  }
}

export { getProfile, updateProfile }
