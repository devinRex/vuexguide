import Vue from 'vue';
import VueRouter from 'vue-router';
import nprogress from 'nprogress';
import store from '@/store';
import { cookie } from 'vux';
import { setDocumentTitle } from '@/services/utils';

Vue.use(VueRouter);

// 页面刷新时，重新赋值token
if (cookie.get('token')) {
    store.commit('setToken', cookie.get('token'));
}

// 下行会被vux-loader替换为src/router/routes.js 详见build/vux-config
const routes = [];

routes.splice(-1, 0,
    {
        path: '/error-page',
        name: 'errorPage',
        component: require('@/components/ErrorPage.vue'),
    },
    {
        path: '*',
        redirect: '/home',
    },
);

const router = new VueRouter({
    routes,
    base: __dirname,
});

const DEFAULT_SHOW_PROGRESS_BAR = true;
// 延迟启动时间
const DEFAULT_DELAY_TIME = 100;
// 额外持续时间
const DEFAULT_LATENCY_TIME = 50;

let requestsTotal = 0;
let requestsCompleted = 0;
let confirmed = true;


function setComplete() {
    requestsTotal = 0;
    requestsCompleted = 0;
    nprogress.done();

    store.commit('updatePageStatus', { isPageLoading: false });
}

nprogress.configure({
    showSpinner: false,
    template: '<div class="nprogress-mask"></div><div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
});

function initProgress() {
    if (requestsTotal === 0) {
        setTimeout(() => nprogress.start(), DEFAULT_DELAY_TIME);

        store.commit('updatePageStatus', { isPageLoading: true });
    }
    requestsTotal++;
    nprogress.set(requestsCompleted / requestsTotal);
}

function increase() {
    // Finish progress bar DEFAULT_LATENCY_TIME ms later
    setTimeout(() => {
        ++requestsCompleted;
        if (requestsCompleted >= requestsTotal) {
            setComplete();
        } else {
            nprogress.set((requestsCompleted / requestsTotal) - 0.1);
        }
    }, DEFAULT_DELAY_TIME + DEFAULT_LATENCY_TIME);
}

// 意向页面
let wishPath;

/* eslint-disable no-unused-vars */
function networkError() {
    increase();
    confirmed = true;

    router.push({ path: '/error-page', query: { to: wishPath } });

    store.commit('updatePageStatus', { isPageError: true });
}

router.beforeEach((to, from, next) => {
    const showProgressBar = 'showProgressBar' in to.meta ? to.meta.showProgressBar : DEFAULT_SHOW_PROGRESS_BAR;
    if (showProgressBar && confirmed) {
        initProgress();
        confirmed = false;
    }

    // 根据业务具体处理
    if (/\/http/.test(to.path)) {
        const url = to.path.split('http')[1];
        window.location.href = `http${url}`;
    } else {
        wishPath = to.fullPath;
        next();
    }
});

router.afterEach((to, from) => {
    const showProgressBar = 'showProgressBar' in to.meta ? to.meta.showProgressBar : DEFAULT_SHOW_PROGRESS_BAR;
    if (showProgressBar) {
        increase();
        confirmed = true;

        store.commit('updatePageStatus', { isPageError: false });
    }

    // 微信浏览器需要主动修改title
    if (window.app.$device.isWechat) {
        setDocumentTitle(to.meta.title);
    } else {
        document.title = to.meta.title;
    }
});

export default router;
