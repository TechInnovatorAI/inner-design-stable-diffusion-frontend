import axios from 'axios'
import api from 'src/configs/api'
import { DateType } from 'src/context/types'

export const countUsers = async () => {
  const loginuserData = JSON.parse(<any>localStorage.getItem('userData')) || null
  const accesstoken = <any>localStorage.getItem('accessToken') || null
  if (loginuserData != null) {
    const config = {
      method: 'get',
      url: api.API + api.userCount,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accesstoken
      }
    }

    return axios(config)
  }
}

export const getAllUser = async () => {
  const loginuserData = JSON.parse(<any>localStorage.getItem('userData')) || null
  const accesstoken = <any>localStorage.getItem('accessToken') || null
  if (loginuserData != null) {
    const config = {
      method: 'get',
      url: api.API + api.Profile,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accesstoken
      }
    }

    return axios(config)
  }
}

export const paginateUser = async (
  page: number,
  rowsPerPage: number,
  orderBy: string,
  order: string,
  searchValue: string,
  startDateRange: DateType,
  endDateRange: DateType
) => {
  const loginuserData = JSON.parse(<any>localStorage.getItem('userData')) || null
  const accesstoken = <any>localStorage.getItem('accessToken') || null
  const data = {
    skip: rowsPerPage * page,
    take: rowsPerPage,
    orderBy: orderBy,
    order: order,
    search: searchValue,
    startDate: startDateRange,
    endDate: endDateRange
  }
  if (loginuserData != null) {
    const config = {
      method: 'post',
      url: api.API + api.userPaginate,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accesstoken
      },
      data: data
    }

    return axios(config)
  }
}

export const paginateBillList = async (
  page: number,
  rowsPerPage: number,
  orderBy: string,
  order: string,
  searchValue: string,
  startDateRange: DateType,
  endDateRange: DateType
) => {
  const loginuserData = JSON.parse(<any>localStorage.getItem('userData')) || null
  const accesstoken = <any>localStorage.getItem('accessToken') || null
  const data = {
    skip: rowsPerPage * page,
    take: rowsPerPage,
    orderBy: orderBy,
    order: order,
    search: searchValue,
    startDate: startDateRange,
    endDate: endDateRange
  }
  if (loginuserData != null) {
    const config = {
      method: 'post',
      url: api.API + api.billingData,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accesstoken
      },
      data: data
    }

    return axios(config)
  }
}
