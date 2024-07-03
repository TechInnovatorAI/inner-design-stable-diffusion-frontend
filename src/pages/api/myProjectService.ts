import axios from 'axios'
import api from 'src/configs/api'

export const getMyProject = async (id: any) => {
  const accesstoken = <any>localStorage.getItem('accessToken') || null
  const data = {
    userId: id
  }
  const config = {
    method: 'post',
    url: api.API + api.myProjectEndpoint,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accesstoken
    },
    data: data
  }

  return axios(config)
}

export const getMyProjectRestyle = async (id: any) => {
  const accesstoken = <any>localStorage.getItem('accessToken') || null
  const data = {
    userId: id
  }
  const config = {
    method: 'post',
    url: api.API + api.myProjectRestyleEndpoint,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accesstoken
    },
    data: data
  }

  return axios(config)
}

export const getMyProjectStaging = async (id: any) => {
  const accesstoken = <any>localStorage.getItem('accessToken') || null
  const data = {
    userId: id
  }
  const config = {
    method: 'post',
    url: api.API + api.myProjectStagingEndpoint,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accesstoken
    },
    data: data
  }

  return axios(config)
}

export const downloadProject = async (fileUrl: string, fileName: string) => {
  const loginuserData = JSON.parse(<any>localStorage.getItem('userData')) || null
  const accesstoken = <any>localStorage.getItem('accessToken') || null
  const data = {
    userId: loginuserData.id,
    fileurl: fileUrl,
    filename: fileName
  }
  const config = {
    method: 'post',
    url: api.API + api.downloadProject,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accesstoken
    },
    data: data
  }

  return axios(config)
}

export const deleteProject = async (projectId: number) => {
  const accesstoken = <any>localStorage.getItem('accessToken') || null
  const config = {
    method: 'delete',
    url: api.API + api.deleteProect + `${projectId}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accesstoken
    }
  }

  return axios(config)
}
