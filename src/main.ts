import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from "axios";
import Model from "@/model/Model";

Vue.$http = axios;

window.$globalBus = new Vue();
window.$model = Model.getInstance();

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')