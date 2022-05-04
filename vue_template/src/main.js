import {createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios' // 追加します。
import VueAxios from 'vue-axios' // 追加します。

// // bootstrap
import "bootstrap/dist/css/bootstrap.min.css"

createApp(App).use(store).use(router)
    .use(VueAxios, axios).mount('#app')
