/* eslint-disable no-unused-vars,import/no-dynamic-require,no-undef */
const routes = [
    {
        path: '/home',
        name: 'home',
        component(resolve) {
            require(['@/views/HelloFromVux.vue'], resolve, networkError);
        },
        meta: { title: '首页' },
    }, {
        path: '/todo',
        name: 'todo',
        component(resolve) {
            require(['@/views/HelloFromVux.1.vue'], resolve, networkError);
        },
        meta: { title: 'todo' },
    },
    {
        path: '/ajax',
        name: 'ajax',
        component(resolve) {
            require(['@/views/demo/ajax.vue'], resolve, networkError);
        },
        meta: { title: 'ajax' },
    },
];
