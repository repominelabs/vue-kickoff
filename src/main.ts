import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { i18n } from './plugins/i18n'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

createApp(App).use(router).use(store).use(i18n).mount('#app')
