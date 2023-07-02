import { createApp } from 'vue'
import { createPinia } from 'pinia'// 引入pinia
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import './assets/public.scss'

const app = createApp(App)

app.use(createPinia())
	.use(router)
	.use(ElementPlus)
	.mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}