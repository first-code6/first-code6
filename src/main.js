import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'  //引入路由
import { createPinia } from 'pinia'    //引入状态管理库
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

let app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
