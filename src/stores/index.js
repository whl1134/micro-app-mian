import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export * from './user'
export * from './route'
export * from './shop'


const store = createPinia()
store.use(piniaPluginPersistedstate)
export default store