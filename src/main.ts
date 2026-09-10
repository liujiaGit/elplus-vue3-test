import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // 必须注册，刷新页面保留所有tagbar标签

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
