import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'// 引入pinia
import './assets/public.scss'

createApp(App)
	.use(createPinia())
	.use(router)
	.use(ElementPlus)
	.mount('#app')
