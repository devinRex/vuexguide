/**
 * config 自定义参数
 *  {
 *      showLoading: true,
 *  }
 *
 * https://github.com/mzabriskie/axios#request-method-aliases
 *
 */
import Vue from 'vue';

export const user = {
    getUserInfo() {
        return Vue.http.get('/user/info');
    },
};

export function getUserInfo() {
    return Vue.http.get('/user/info');
}

export const demo = {
    get1() {
        return Vue.http.get('/user/info', { showLoading: true });
    },
    get2() {
        return Vue.http.get('/user/info', { showLoading: false });
    },
};
