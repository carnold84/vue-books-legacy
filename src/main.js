// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueSVGCustomIcon from 'vue-svg-custom-icon';
import App from './App';
import router from './router';
import VueSVGIcon from 'vue-svgicon';

Vue.use(VueSVGIcon);
Vue.use(VueSVGCustomIcon, { basePath: '/static/svg' });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
});
