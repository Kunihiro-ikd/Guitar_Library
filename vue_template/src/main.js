import {createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios' 
import VueAxios from 'vue-axios'

// // bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
require("./assets/style/main.scss"); 

const app = createApp(App);

// app.config.compilerOptions.isCustomElement = tag => tag.startsWith('vue-')
// app.config.compilerOptions.isCustomElement = tag => tag.startsWith('dra-')
// app.config.compilerOptions.isCustomElement = tag => tag.startsWith('-')

app.use(store).use(router)
    .use(VueAxios, axios).mount('#app')

