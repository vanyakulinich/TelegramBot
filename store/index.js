import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    state: {
      // data: null
      // mock
      data: {
        personal: {
          firstName: "Ivan",
          lastName: "Kulinich",
          extra: {
            phone: "111111111111",
            email: "test@test.test"
          }
        },
        reminders: {
          1548882567989: {
            text: "test reminder test",
            date: "Date format in ISO string",
            time: "Time in format hh:mm",
            dateUTC: "dateUTC",
            dateMs: "dateInMilliseconds",
            expired: false
          }
        },
        tokens: {
          publicToken: "publicToken",
          privateToken: "privateToken"
        }
      }
    },
    actions: { ...actions },
    mutations: { ...mutations },
    getters: { ...getters }
  });

export default store;
