import Axios from 'axios'
import * as Auth from './auth'
import routes from '@/routes'
// import { Notification } from 'ant-design-vue'


const STATUS_CODE = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功',
  400: '请求错误(400)',
  401: '未授权，请重新登录(401)',
  403: '拒绝访问(403)',
  404: '请求出错(404)',
  408: '请求超时(408)',
  500: '服务器错误(500)',
  501: '服务未实现(501)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网络超时(504)',
}


const create = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 50 * 1000,
})

// 请求拦截器
create.interceptors.request.use(
  (config) => {
    config.headers['CLIENT_ID'] = import.meta.env.VITE_CLIENT_ID

    const token = Auth.getToken()
    if (token) {
      if (!config.headers) {
        config.headers = {}
      }
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)


// 响应拦截器
create.interceptors.response.use(
  (res) => {
    if (res.data.success) return res

    // Notification.error(STATUS_CODE[res.data.code])


    if (res.data.code === 401) {
      
    }
    // const { data } = response
    // const { success, code, msg } = data

    // if (response.request.responseType === 'blob') {
    //   const contentType = data.type
    //   if (contentType.startsWith('application/json')) {
    //     const reader = new FileReader()
    //     reader.readAsText(data)
    //     reader.onload = () => {
    //       const { success, msg } = JSON.parse(reader.result as string)
    //       if (!success) {
    //         handleError(msg)
    //       }
    //     }
    //     return Promise.reject(msg)
    //   } else {
    //     return response
    //   }
    // }

    // if (success) {
    //   return response
    // }

    // // Token 失效
    // if (code === '401' && response.config.url !== '/auth/user/info') {
    //   modalErrorWrapper({
    //     title: '提示',
    //     content: msg,
    //     maskClosable: false,
    //     escToClose: false,
    //     okText: '重新登录',
    //     async onOk() {
    //       const userStore = useUserStore()
    //       await userStore.logoutCallBack()
    //       await router.replace('/login')
    //     },
    //   })
    // } else {
    //   handleError(msg)
    // }
    // return Promise.reject(new Error(msg || '服务器端错误'))
  },
  (error) => {
    // if (!error.response) {
    //   handleError('网络连接失败，请检查您的网络')
    //   return Promise.reject(error)
    // }
    // const status = error.response?.status
    // const errorMsg = StatusCodeMessage[status] || '服务器暂时未响应，请刷新页面并重试。若无法解决，请联系管理员'
    // handleError(errorMsg)
    // return Promise.reject(error)
  },
)




export default create