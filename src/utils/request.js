import axios from 'axios';
import { getToken } from '@/utils/auth'
// 创建axios实例
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    // 请求超时
    timeout: 5000
});
// 请求拦截器
service.interceptors.request.use(
    (config) => {
        const token = getToken();
        const { notAuth = false } = config.headers;
        if (!notAuth) {
            config.headers['token'] = token;
        }
        return config;
    },
    (error) => {
        // 做一些请求错误
        return Promise.reject(error);
    }
);
// 响应拦截器
service.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (res.code != 1) {
            debounce(() => {
                console.log('res.msg', res.msg);
            }, 500);

            if (res.code == -1000) {

            }
            return Promise.reject(response);
        } else {
            return res;
        }
    },
    (error) => {
        debounce(() => {
            console.log('网络错误');
        }, 1000);

        return Promise.reject(error);
    }
);
// 防抖函数 防止多次弹出报错
let timeout = null;
function debounce(fn, wait) {
    if (timeout !== null) {
        clearTimeout(timeout);
    }
    timeout = setTimeout(fn, wait);
}
export default service;
