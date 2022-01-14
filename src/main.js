import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios'
import Vuex from 'vuex'

import { setHeaderToken } from './utils/auth'
Vue.use(VueSweetalert2);
Vue.use(Vuex)

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

Vue.config.productionTip = false

const token = localStorage.getItem('access_token');
if (token) {
  setHeaderToken(token)
}

Vue.use(axios)




// const router = new VueRouter({
//   routes
// })


store.dispatch('get_user', token)
  .then(() => {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }).catch((error) => {
    console.error(error);
  })

 
