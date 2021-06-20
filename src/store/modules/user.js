import {removeToken} from "@/utils/auth";
import {logout} from "@/api/login";

export default {
    namespaced: true,
    state: {
        avatar: 'al_1.png',
        nickname: '',
        roles: []
    },
    mutations: {
        SET_ROLES(state, roles) {
            state.roles = roles;
        }
    },
    actions: {
        GetInfo({commit}) {
            commit('SET_ROLES', ['admin']);
        },
        Logout({commit, dispatch}) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    commit('SET_PERMISSIONS', []);
                    removeToken();
                    dispatch('tagsView/delAllViews', null, {root: true});
                    resolve();
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
}
