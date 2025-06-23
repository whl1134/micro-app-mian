export const TOKEN_KEY = 'token'

export const isLogin = () => !!localStorage.getItem(TOKEN_KEY)

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const setToken = token => localStorage.setItem(TOKEN_KEY, token)

export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

export const setStorageUserInfo = (userInfo) => localStorage.setItem('userInfo', JSON.stringify(userInfo))

export const getStorageUserInfo = () => JSON.parse(localStorage.getItem('userInfo') || "{}")
