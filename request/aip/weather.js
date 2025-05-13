import {request} from '../request.js'
//查询天气
export const  getWeatherApi = (data) => {
  return request({
    url: `/weather?city=${data}`,
    method: 'GET',	
  })
}
