// Import plugins, components and etc.
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import defineGlobalProperties from './utils/helpers/global-properties'
import { i18n } from './plugins/i18n'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

// Import styles
import './assets/style/main.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'sweetalert2/dist/sweetalert2.min.css'

// Create Vue app instance
const app = createApp(App)

// Define Global Properties
defineGlobalProperties(app)

// Add plugins, components and etc. to the main Vue instance
app.use(router).use(store).use(i18n).mount('#app')