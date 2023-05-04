import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

//导入字体图标
import './assets/login/iconfont.css'
import './assets/login1/iconfont.css'

//导入全局样式表
import './assets/css/global.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import axios from 'axios'


const app = createApp(App)
//配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
app.config.globalProperties.$axios = axios

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(ElementPlus,{
    locale:zhCn
})
app.use(router).mount('#app')


// createApp(App).use(router).mount('#app')
