import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import showCodeMessage from './code'
import { ElMessage } from 'element-plus'
import { formatJsonToUrlParams, instanceObject } from '@/utils/format'

// const baseURL = import.meta.env.VITE_APP_BASE_API || '/api'
const baseURL = 'http://localhost:3015/'
// 创建实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  timeout: 1000 * 30,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status == 200) {
      return response.data
    }
    ElMessage.info(JSON.stringify(response.status))
    return response
  },
  (error: AxiosError) => {
    const { response } = error
    if (response) {
      // 根据状态码处理错误信息
      ElMessage.error(showCodeMessage(response.status))
      return Promise.reject(response.data)
    }
    ElMessage.warning('网络连接异常,请稍后再试!')
    return Promise.reject(error)
  },
)

const service = {
  get<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.get(url, { params: data })
  },

  post<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.post(url, data)
  },

  put<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.put(url, data)
  },

  delete<T = any>(url: string, data?: object): Promise<T> {
    return axiosInstance.delete(url, data)
  },

  upload: (url: string, file: FormData | File) =>
    axiosInstance.post(url, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  download: (url: string, data: instanceObject) => {
    window.location.href = `${baseURL}/${url}?${formatJsonToUrlParams(data)}`
  },
}

export default service
