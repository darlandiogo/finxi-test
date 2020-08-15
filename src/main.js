import Vue from 'vue'
import dotenv from 'dotenv'
import SuiVue from 'semantic-ui-vue';
import App from './App.vue'
import router from './router'

import 'semantic-ui-css/semantic.min.css';

dotenv.config()

Vue.config.productionTip = false

Vue.use(SuiVue);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
