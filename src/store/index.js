import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const createStore = (data) => {
  return new Vuex.Store({
    state: {
      data
    },
    actions: {
      // TODO
    },
    mutations: {
      // TODO
    }
  })
}
