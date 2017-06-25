import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

/* eslint-disable no-shadow */
const state = {
    token: null,
};


const mutations = {
    setToken: (state, data) => {
        state.token = data;
    },
};

const page = {
    state: {
        isPageError: false,
        isPageLoading: false,
        isAjaxLoading: false,
    },
    mutations: {
        updatePageStatus(state, payload) {
            Object.assign(state, payload);
        },
    },
};

export default new Vuex.Store({
    state,
    mutations,
    modules: {
        page,
    },
    strict: process.env.NODE_ENV !== 'production',
});

