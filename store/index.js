import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    state: {
      data: {
        user: null,
        token: null
      }
    },
    actions: {
      nuxtServerInit({ commit }, { req }) {
        if (req && req.initData) {
          const { user, token } = req.initData;
          commit("data", {
            user,
            token
          });
        }
      }
    },
    mutations: {
      data: (state, payload) => (state.data = { ...payload })
    }
  });

export default store;
