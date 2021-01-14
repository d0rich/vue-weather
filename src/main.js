import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

import {mapMutations, mapState} from "vuex"

Vue.mixin({
  computed:{
    ...mapState(['location', 'city', 'region', 'regions', 'timeNow'])
  },
  methods:{
    ...mapMutations(['setLocation', 'setCity', 'setRegion'])
  }
})

new Vue({
  router,
  store,
  axios,
  vuetify,
  render: h => h(App)
}).$mount('#app')
