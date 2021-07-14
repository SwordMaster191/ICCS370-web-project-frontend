import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: null,
    name: null,
    roles: '',

  },
  mutations: {
    setIsLoggedIn(state, isLoggedIn){
      console.log(isLoggedIn);
      state.isLoggedIn = isLoggedIn;
    },
    setUsername(state, username){
      console.log(username);
      state.isLoggedIn = username;
    },
    setName(state, name){
      state.isLoggedIn = name;
    },
    setRole(state, role){
      state.isLoggedIn = role;
    },
  },
  actions: {
      setLoggedInUser({commit}, payload){
        commit('setIsLoggedIn', payload.loggedIn);
        commit('setUsername', payload.username);
        commit('setName', payload.name);
        commit('setRole', payload.role);
    },
    clearUser({commit}){
      commit('setIsLoggedIn', false);
      commit('setUsername', null);
      commit('setName', null);
      commit('setRole', "");
    },
  },
  modules: {},
});
