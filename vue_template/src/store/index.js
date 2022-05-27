import { createStore } from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import auth from './modules/auth.js'
import http from './modules/http.js'
export default createStore({
  modules: {
    auth,
    http,
  },
  plugins: [createPersistedState({
    key: 'example',
    storage: window.sessionStorage,
  })]
})
