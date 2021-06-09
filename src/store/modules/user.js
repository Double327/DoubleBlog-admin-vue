export default {
    namespaced: true,
    state: {
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
        }
    }
}
