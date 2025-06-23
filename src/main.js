import { createApp } from 'vue'
import { start } from  './micro'
import routes from '@/routes'
import './routes/permission'
import './styles/index.scss'
import App from './App.vue' 
import './utils'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import '@/assets/font-awesome/css/font-awesome.min.css'

import * as AntdIcon from '@ant-design/icons-vue'
// 状态管理
import pinia from '@/stores'
 
const app = createApp(App)
app.use(pinia)
app.use(routes)
app.use(Antd) 
app.mount('#app')

for (const key in AntdIcon) {
  app.component(key, AntdIcon[key])
}


start()

