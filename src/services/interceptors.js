import store from '@/store';

const DEFAULT_SHOW_LOADING = true;
// 延迟启动时间
const DEFAULT_DELAY_TIME = 100;
// 额外持续时间
const DEFAULT_LATENCY_TIME = 50;

let requestsTotal = 0;
let requestsCompleted = 0;

function setComplete() {
    requestsTotal = 0;
    requestsCompleted = 0;

    store.commit('updatePageStatus', { isAjaxLoading: false });
}

function initProgress() {
    if (requestsTotal === 0) {
        setTimeout(() => store.commit('updatePageStatus', { isAjaxLoading: true }), DEFAULT_DELAY_TIME);
    }
    requestsTotal++;
}

function increase() {
    // Finish ajax loading DEFAULT_LATENCY_TIME ms later
    setTimeout(() => {
        ++requestsCompleted;
        if (requestsCompleted >= requestsTotal) {
            setComplete();
        }
    }, DEFAULT_DELAY_TIME + DEFAULT_LATENCY_TIME);
}

export default {
    request(config) {
        if (!('showLoading' in config)) config.showLoading = DEFAULT_SHOW_LOADING;

        if (config.showLoading) initProgress();

        if (store.state.token) {
            // 请结合具体业务变更
            if (config.method === 'get') {
                config.params = Object.assign({ token: store.state.token }, config.params);
            } else {
                config.data = Object.assign({ token: store.state.token }, config.data);
            }
        }

        return config;
    },
    requestError(error) {
        return Promise.reject(error.response);
    },
    response(response) {
        const config = response.config;

        if (config.showLoading) increase();

        if (response.data.code === 0) {
            // do sth
        } else {
            return Promise.reject(response);
        }

        return response;
    },
    responseError(error) {
        const config = error.config;

        if (config && config.showLoading) increase();

        return Promise.reject(error.response);
    },
};
