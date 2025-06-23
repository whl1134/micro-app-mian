import hasPerm from './permission'

export default {
  install(Vue) {
    Vue.directive('permission', hasPerm)
  },
}