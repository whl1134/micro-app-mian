import { defineStore } from "pinia";
import { Auth } from '@/utils'
const state = () => {
  return {
    userInfo: Auth.getStorageUserInfo(),
    token: Auth.getToken()
  }
};

const getters = {
  getUserInfo () {
    if (!this.userInfo.id) return false
    return this.userInfo
  }
};

// 登录
const login = async (req, authType) => {
  const res = await $fetch({
    url: '/auth/login',
    method: 'post',
    data: {
      ...req,
      clientId: import.meta.env.VITE_CLIENT_ID,
      authType: authType // 'ACCOUNT'
    },
    headers: {
      clientId: import.meta.env.VITE_CLIENT_ID,
      authType: authType // 'ACCOUNT'
    }
  })
  if (res.data.success) {
    return res.data.data.token
  }
}



const getInfo = async () => {
  const res = await $fetch({
    url: '/auth/user/info',
    method: 'get'
  })
  if (res.data.success) {
    const zip = {}
    const permissions = res.data.data.permissions
    for(let i = 0; i < permissions.length; i++) {
      zip[permissions[i]] = permissions[i]
    }
    // const zipPermissions = zipPermissions(res.data.data)
    console.log(zip);
    Object.assign(res.data.data, { zipPermissions: zip })
    // res.data.data.zip = zipPermissions
    return res.data.data
  }
}

const actions = {
  async getInfo () {
    return Promise(async (resolve, reject) => {
      try{
        const userInfo = await getInfo()
        this.userInfo = userInfo
        Auth.setStorageUserInfo(userInfo)
        resolve(userInfo, token)
      }catch (err) {
        reject(err)
      }
    })
  },
  async setUserInfo () {
    this.getInfo()
  },
  async accountLogin(res) {
    return new Promise(async (resolve, reject) => {
      try{
        const token = await login(res, 'ACCOUNT')
        this.token = token
        Auth.setToken(token)
        const userInfo = await getInfo()
        this.userInfo = userInfo
        Auth.setStorageUserInfo(userInfo)
        resolve(userInfo, token)
      }catch (err) {
        reject(err)
      }
    })
  },
  
}


export const useUserStore = defineStore('user', { state, getters, actions })
