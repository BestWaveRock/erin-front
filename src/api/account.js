import request from '../utils/request'

export function get (param) {
  return request({
    url: '/baseService/sysUser/' + param,
    method: 'get'
  })
}

export function register (data) {
  return request({
    url: '/baseService/sysUser/register',
    method: 'post',
    data
  })
}

export function login (data) {
  return request({
    url: '/baseService/sysUser/login',
    method: 'post',
    data
  })
}
