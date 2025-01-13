import request from '@/utils/request'
//import qs from 'query-string'
// 钉钉免密登录
export function ddloginApi(params) {
  return request({
    url: '/home/login/dd_login',
    method: 'GET',
    params
  })
}

// 钉钉扫码登录【浏览器】
export function webLoginApi(params) {
  return request({
    url: '/home/login/dd_scan_login',
    method: 'GET',
    params
  })
}
