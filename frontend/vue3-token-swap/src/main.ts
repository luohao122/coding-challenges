import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import localStoragePlugin from '@/plugins/pinia/localStoragePlugin'

const app = createApp(App)
const pinia = createPinia()

// Add localStoragePlugin to pinia
pinia.use(localStoragePlugin)

app.use(pinia)
app.use(router)

app.mount('#app')
