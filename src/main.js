import Vue from 'vue';
import App from './App';
import router from '@/router/routes';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/assets/style/index.scss'
import '@/assets/style/doubleblog.scss'

import Pagination from '@/components/pagination';


import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import {addDateRange, handleTree, parseTime, resetForm, selectDictLabel} from "@/utils/doubleblog";

Vue.use(mavonEditor)

Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.parseTime = parseTime;
Vue.prototype.resetForm = resetForm;
Vue.prototype.addDateRange = addDateRange;
Vue.prototype.selectDictLabel = selectDictLabel;
Vue.prototype.handleTree = handleTree
Vue.prototype.msgSuccess = function (msg) {
    this.$message({showClose: true, message: msg, type: "success"});
};
Vue.prototype.msgError = function (msg) {
    this.$message({showClose: true, message: msg, type: "error"});
};
Vue.prototype.msgWarning = function (msg) {
    this.$message({showClose: true, message: msg, type: "warning"});
};

/**
 * 全局挂载组件
 */
Vue.component('Pagination', Pagination);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
