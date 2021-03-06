// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from './router/axios';
import VueAxios from 'vue-axios';
import App from './App'
import router from './router'
import Vant, {Lazyload} from 'vant';
import 'vant/lib/index.css';
import store from './store/index.js'
import Vuex from 'vuex'

Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.use(Lazyload);
Vue.use(Vant);

Vue.config.productionTip = false;
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  if(to.path.indexOf('/entrance')== -1){
    next();
  }else{
    if (localStorage.drawer != null) {
      next()
    } else {
      next({path: '/'})
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
