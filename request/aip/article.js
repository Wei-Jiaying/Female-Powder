import {request} from '../request.js'
//获取推文
export const  getArticleApi = (data) => {
  return request({
    url: `/article/list`,
    method: 'GET',	
  })
}
