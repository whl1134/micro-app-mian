import { defineStore } from "pinia"

const state = () => {
  return {
    shops: [],
    currentShop: JSON.parse(localStorage.getItem('currentShop') || "{}")
  }
}

const getters = {
  getCurrentShop() {
    return this.currentShop
  }
}


const actions = {
  setCurrentShop(currentShop) {
    this.currentShop = currentShop
    localStorage.setItem('currentShop', JSON.stringify(currentShop))
  },
  setDocumentTitle () {
    document.title = this.currentShop.name
  },
  async getUserCurrentShopInfo() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await $fetch({
          url: '/auth/user/getUserDeptInfo'
        })
        if (res.data.success) {
          const shops = res.data.data
          this.shops = shops
          this.setDocumentTitle()
          if (!this.currentShop.id) {
            this.setCurrentShop(shops?.[0] ?? {})
          }
          resolve(shops)
        }
      } catch (err) {
        reject(err)
      }
    })
  }
}


export const useShopStore = defineStore('shop', { state, getters, actions })
