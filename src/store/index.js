import Vue from 'vue'
import Vuex from 'vuex'
import app from "@/store/modules/app";
import permission from "@/store/modules/permission";
import settings from "@/store/modules/settings";
import getters from "@/store/getters";
import user from "@/store/modules/user";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        app,
        user,
        permission,
        settings
    },
    getters: getters
})
