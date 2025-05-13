import { request } from '../requestNoToken.js'

// 登录
export const loginApi = (data) => {
  return request({
    url: `/common/login`,
    method: 'POST',
    data: data,
    
  })
}
//注册
export const registApi = (data) => {
  return request({
    url: `/register`,
    method: 'POST',
    data: data,
    
  })
}