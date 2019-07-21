import Vue from 'vue'
import App from './App'
import pageEnd from './components/pageEnd/pageEnd.vue'
import share from './components/share/share.vue'
import { getToken, toast, loading, retTime, goWindow, goNavWindow, goPhone, qx, uploadImageUrl, guoLv, isPhone } from '@/common/utils.js'
import store from './store'

Vue.component('page-end',pageEnd)
Vue.component('share',share)

Vue.config.productionTip = false

Vue.prototype.$retTime = retTime;
Vue.prototype.$getToken = getToken;
Vue.prototype.$toast = toast;
Vue.prototype.$loading = loading;
Vue.prototype.$goWindow = goWindow;
Vue.prototype.$goNavWindow = goNavWindow;
Vue.prototype.$goPhone = goPhone;
Vue.prototype.$qx = qx;
Vue.prototype.$guoLv = guoLv;
Vue.prototype.$isPhone = isPhone;
// 上传图片接口地址
Vue.prototype.$uploadImageUrl = uploadImageUrl;
// uni-app 使用Vuex s只支持全局挂载方式
Vue.prototype.$store = store;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
