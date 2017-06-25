import Vue from 'vue';
import { querystring, AjaxPlugin, AlertPlugin, ConfirmPlugin, DevicePlugin, LoadingPlugin, ToastPlugin } from 'vux';
import FastClick from 'fastclick';

import store from './store';
import router from './router';
import interceptors from './services/interceptors';
import App from './App';
import mock from './services/mock';

Vue.use(AjaxPlugin);
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(DevicePlugin);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);

const http = Vue.http;

mock.bootstrap(http);

http.defaults.baseURL = location.origin;
http.defaults.timeout = 15000;
http.defaults.transformRequest = [data => querystring.stringify(data)];
http.interceptors.request.use(interceptors.request, interceptors.requestError);
http.interceptors.response.use(interceptors.response, interceptors.responseError);

window.Vue = Vue;
window.router = router;
window.Bus = new Vue();

FastClick.attach(document.body);

/* eslint-disable no-new */
window.app = new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app-box');
