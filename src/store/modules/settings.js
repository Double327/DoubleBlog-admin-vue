import variables from '@/assets/style/element-variables.scss';
import config from '@/config';

export default {
    namespaced: true,
    state: {
        title: config.title,
        theme: variables.theme,
        showSettings: config.showSettings,
        tagsView: config.tagsView,
        fixedHeader: config.fixedHeader,
        sidebarLogo: config.sidebarLogo,
        showFooter: config.showFooter,
        footerTxt: config.footerText,
        caseNumber: config.caseNumber,

    },
    mutations: {
        CHANGE_SETTING: (state, {key, value}) => {
            if (Object.prototype.hasOwnProperty.call(state, key)) {
                state[key] = value
            }
        }
    },
    actions: {
        changeSetting({commit}, data) {
            commit('CHANGE_SETTING', data);
        }
    }
}
