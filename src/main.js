import Vue from 'vue'
import App from './App.vue'
import vIcon from 'vue-icon'
import config from './config'
import translations from './translations/translations.json'
import { register_service_worker } from './utils'

register_service_worker()

Vue.config.productionTip = false
Vue.prototype.config = config // <- set config to global scope
Vue.prototype.translations = translations // <- set translations to global scope

Vue.use(vIcon, {
    name: 'v-icon',
    props: {
        baseClass: {
            type: String,
            default: 'v-icon'
        },
        classPrefix: {
            type: String,
            default: 'v-icon-'
        }
    }
})

/* (global) This code is going to tell us, if history mode can be activated on the client, so the application can be consumed without sessionStorage */
Vue.prototype.history = () => {
    try {
        sessionStorage.getItem('@gipsy:check')
        return true
    }

    catch {
        return false
    }
}

/* (global) Currently selected language or fallback language (en). Needs to be a function, since it's reactive. No need for vuex there */
Vue.prototype.lang = () => {
    if (Vue.prototype.history()) return sessionStorage.getItem('@gipsy:lang') || config.fallback_lang
    return config.fallback_lang
}

new Vue({render: h => h(App)}).$mount('#app')
