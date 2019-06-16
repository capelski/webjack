// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import { createStore } from './store'

import 'webjack-ui-components/dist/index.css';

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    render: createElement => createElement(App as any),
    store: createStore()
});
