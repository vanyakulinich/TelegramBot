import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    user: {
      test: 'test'
    }
  },
  actions: {
    nuxtServerInit ({ commit }, { req }) {
      console.log(req.user)
      if (req && req.user) {
        // commit('user', req.user)
        commit('user', {test: 'test2'})
      }
      // console.log('store', this.store)
    }
  },
  mutations: {
  }
})

export default store