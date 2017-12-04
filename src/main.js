import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './store'
import VueLazyLoad from 'vue-lazyload'

import '@/common/stylus/index.styl'

fastclick.attach(document.body);

Vue.use(VueLazyLoad, {
  loading: require('@/common/image/album_300.png')
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
