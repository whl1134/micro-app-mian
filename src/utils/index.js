import axios from './axios'
import * as encrypt from './encrypt'
import * as Auth from './auth'

export * from './mic'

window.$encrypt = encrypt
window.$auth = Auth
// 注册全局属性
window.$fetch = axios

export { axios, encrypt, Auth }

