import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import routes from './routes';
import "vant/lib/index.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
});
new Vue({
  router,
  render: h => h(App),

}).$mount('#app')
