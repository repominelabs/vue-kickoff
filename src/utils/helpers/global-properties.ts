import { App } from 'vue'
import sweetalert2 from 'sweetalert2'

const defineGlobalProperties = (app: App) => {
    const toast = sweetalert2.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    })
    app.config.globalProperties.$toast = toast
    app.config.globalProperties.$swal = sweetalert2
}

export default defineGlobalProperties