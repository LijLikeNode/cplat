// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/js/zepto.js';
import './assets/css/mpicker.css'
import './assets/js/mPicker.js'
import Vue from 'vue';
import App from './App';
import router from './router';
import common from './common/common';
import pop from './common/popalert';
import ax from './common/server';
import store from './vuex/store';
import animate from 'animate.css';

import {DateTime} from 'vue-ydui/dist/lib.rem/datetime';
//import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
// let vConsole = new VConsole() // 初始化
Vue.component(DateTime.name, DateTime);
// import './assets/js/noshare';
// import './assets/js/weChat_share.js';

Vue.config.productionTip = false;


window.ax = ax;
window.common = common;
window.popalert = pop;
// window.baseUrl = 'http://test.hxlife.com/ssj/data_web/';
window.baseUrl = 'http://pcwebtest.ihxlife.com/data_web/';
/* eslint-disable no-new */

const historyStack = {
    data: {
        history: [],
        forward: true
    },
    watch: {
        '$route' (to, from) {
            document.title=to.meta.txt;
            if(this.history.length > 0 && to.path == this.history[this.history.length - 1]){
                this.forward = false;
                this.history.pop();
            }else{
                this.forward = true;
                this.history.push(from.path);
            }
            // if(to.name=='intro'||to.name=='ybtintro'){
            //   let isIphone = navigator.userAgent.includes('iPhone');
            //   if(isIphone){
            //     window.location.reload();
            //   }
            // }
        }
    }
};


new Vue({
  el: '#app',
  router,
  store,
  mixins: [historyStack],
  template: '<App :forward="forward"/>',
  components: { App }
})
