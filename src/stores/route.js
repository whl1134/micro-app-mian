import { defineStore } from "pinia"
import { systemRoutes } from '@/routes'
import { mapTree, toTreeArray } from 'xe-utils'


const state = () => {
  return {
    asyncRoutes: [],
    systemRoutes
  }
}

const getters = {
  getAsyncRoutes () {
    return this.asyncRoutes
  }
}

// 组装路由信息
const formatAsyncRoutes = (routes) => {

  return mapTree(routes, (item) => {
    return {
      path: item.path,
      name: item.name,
      component: item.component,
      redirect: item.redirect,
      meta: {
        ...item,
        title: item.title,
        hidden: item.isHidden,
        keepAlive: item.isCache,
        icon: item.icon,
        showInTabs: item.showInTabs,
        activeMenu: item.activeMenu,
      },
    }
  })
}
const actions = {
  async generateRoutes () {
    return new Promise(async (resolve, reject) => {
      try{
        const res = await $fetch({
          url: '/auth/user/route'
        })
        if (res.data.success) {
          const asyncRoutes = formatAsyncRoutes(res.data.data)
          this.asyncRoutes = asyncRoutes
          resolve(asyncRoutes)
        }
      }catch (err) {
        reject(err)
      }
    })
  }
}


export const useRouteStore = defineStore('route', { state, getters, actions })
