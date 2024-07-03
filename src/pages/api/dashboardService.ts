import axios from 'axios'
import api from 'src/configs/api'
import { RoomType } from 'src/context/types'

const generateRestyleImage = async (
  name: string,
  roomName: RoomType | null,
  designStyle: string,
  color: string,
  material: string,
  floor: string,
  editPrompt: string,
  upLoadImageLink: string,
  url: string
) => {
  const loginuserData = JSON.parse(<any>localStorage.getItem('userData')) || null
  const accesstoken = <any>localStorage.getItem('accessToken') || null
  if (loginuserData != null) {
    // const fd = new FormData()
    const data = JSON.stringify({
      name: name,
      prompt:
        designStyle +
        ' ' +
        roomName?.value +
        ', ' +
        editPrompt +
        ',' +
        color +
        'color, ((' +
        floor +
        'style floor)), ((' +
        material +
        ' material design style))',
      userId: loginuserData.id,
      baseUrl: upLoadImageLink,
      url: url
    })

    const config = {
      method: 'post',
      url: api.API + api.generateRestyleEndpoint,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accesstoken
      },
      data: data
    }

    return axios(config)
  }
}

const generateStagingImage = async (
  name: string,
  roomName: RoomType | null,
  designStyle: string,
  color: string,
  material: string,
  floor: string,
  editPrompt: string,
  upLoadImageLink: string,
  uplaodMakdLink: string,
  url: string,
  width: number,
  height: number
) => {
  const loginuserData = JSON.parse(<any>localStorage.getItem('userData')) || null
  const accesstoken = <any>localStorage.getItem('accessToken') || null
  if (loginuserData != null) {
    // const fd = new FormData()
    const data = JSON.stringify({
      name: name,
      prompt:
        designStyle +
        ' ' +
        roomName?.value +
        ', ' +
        editPrompt +
        ',' +
        color +
        'color, ((' +
        floor +
        'style floor)), ((' +
        material +
        ' material design style))',
      userId: loginuserData.id,
      baseUrl: upLoadImageLink,
      maskUrl: uplaodMakdLink,
      url: url,
      width: width,
      height: height
    })

    const config = {
      method: 'post',
      url: api.API + api.generateStagingEndpoint,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accesstoken
      },
      data: data
    }

    return axios(config)
  }
}

const generateMaskRestyleImage = async (
  name: string,
  roomName: RoomType | null,
  designStyle: string,
  color: string,
  material: string,
  floor: string,
  editPrompt: string,
  upLoadImageLink: string,
  uplaodMakdLink: string,
  url: string,
  width: number,
  height: number
) => {
  const loginuserData = JSON.parse(<any>localStorage.getItem('userData')) || null
  const accesstoken = <any>localStorage.getItem('accessToken') || null
  if (loginuserData != null) {
    // const fd = new FormData()
    const data = JSON.stringify({
      name: name,
      prompt:
        designStyle +
        ' ' +
        roomName?.value +
        ', ' +
        editPrompt +
        ',' +
        color +
        'color, ((' +
        floor +
        'style floor)), ((' +
        material +
        ' material design style))',
      userId: loginuserData.id,
      baseUrl: upLoadImageLink,
      maskUrl: uplaodMakdLink,
      url: url,
      width: width,
      height: height
    })

    const config = {
      method: 'post',
      url: api.API + api.generateMaskRestyleEndpoint,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accesstoken
      },
      data: data
    }

    return axios(config)
  }
}

const getRestyleProject = async (id: any) => {
  const accesstoken = <any>localStorage.getItem('accessToken') || null
  const data = {
    userId: id
  }
  const config = {
    method: 'post',
    url: api.API + api.getRestyleEndpoint,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accesstoken
    },
    data: data
  }

  return axios(config)
}

const getStagingProject = async (id: any) => {
  const accesstoken = <any>localStorage.getItem('accessToken') || null
  const data = {
    userId: id
  }
  const config = {
    method: 'post',
    url: api.API + api.getStagingEndpoint,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accesstoken
    },
    data: data
  }

  return axios(config)
}

const getAllProject = async () => {
  const config = {
    method: 'get',
    url: api.API + api.getAllProjectEndpoint,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return axios(config)
}

const getbaseImage = async () => {
  const config = {
    method: 'get',
    url: api.API + api.baseImageEndpoint,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return axios(config)
}

const getroomStyle = async () => {
  const config = {
    method: 'get',
    url: api.API + api.roomStyleEndpoint,
    headers: {
      'Content-Type': 'appleication/json'
    }
  }

  return axios(config)
}

const uploadImageService = async (file: File, width: any, height: any) => {
  const accesstoken = <any>localStorage.getItem('accessToken') || null
  const loginuserData = JSON.parse(<any>localStorage.getItem('userData')) || null

  const formData = new FormData()
  console.log('*********avatar****')

  console.log(file)
  console.log(loginuserData);
  await formData.append('myFile', file, loginuserData.id + '-' + width + '-' + height)
  const config = {
    method: 'post',
    url: api.API + api.uploadImageEndpoint,
    headers: {
      'Context-Type': 'application/json',
      Authorization: 'Bearer ' + accesstoken
    },
    data: formData
  }

  return axios(config)
}

const uploadAvatarService = async (file: File) => {
  const accesstoken = <any>localStorage.getItem('accessToken') || null
  const loginuserData = JSON.parse(<any>localStorage.getItem('userData')) || null

  const formData = new FormData()
  await formData.append('avatarFile', file, loginuserData.id)
  console.log('*********avatar****')
  console.log(file)
  const config = {
    method: 'post',
    url: api.API + api.uploadAvatarEndpoint,
    headers: {
      'Context-Type': 'application/json',
      Authorization: 'Bearer ' + accesstoken
    },
    data: formData
  }

  return axios(config)
}

const uploadMaskService = async (file: File) => {
  const accesstoken = <any>localStorage.getItem('accessToken') || null
  const loginuserData = JSON.parse(<any>localStorage.getItem('userData')) || null

  const formData = new FormData()
  await formData.append('maskFile', file, loginuserData.id)
  console.log('formData', formData)
  const config = {
    method: 'post',
    url: api.API + api.uploadMaskEndpoint,
    headers: {
      'Context-Type': 'application/json',
      Authorization: 'Bearer ' + accesstoken
    },
    data: formData
  }

  return axios(config)
}

const uploadNoneMask = async (width: number, height: number) => {
  const accesstoken = <any>localStorage.getItem('accessToken') || null
  const loginuserData = JSON.parse(<any>localStorage.getItem('userData')) || null
  if (loginuserData != null) {
    // const fd = new FormData()
    const data = JSON.stringify({
      width: width,
      height: height
    })

    const config = {
      method: 'post',
      url: api.API + api.uploadNoneMaskEndpoint,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accesstoken
      },
      data: data
    }

    return axios(config)
  }
}

export {
  generateRestyleImage,
  generateStagingImage,
  getRestyleProject,
  getStagingProject,
  getAllProject,
  getbaseImage,
  getroomStyle,
  uploadImageService,
  uploadMaskService,
  generateMaskRestyleImage,
  uploadNoneMask,
  uploadAvatarService
}
