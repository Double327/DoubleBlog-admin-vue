import Vue from 'vue'
import Vuex from 'vuex'
import app from "@/store/modules/app";
import permission from "@/store/modules/permission";
import settings from "@/store/modules/settings";
import getters from "@/store/getters";
import user from "@/store/modules/user";
import tagsView from "@/store/modules/tagsView";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        app,
        user,
        tagsView,
        permission,
        settings
    },
    getters: getters
})
