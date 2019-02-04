import Vue from "vue";
import Vuex from "vuex";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";

Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    state: {
      // data: {}
      // mock
      data: {
        personal: {
          extra: {
            link: "test2",
            link2: "test",
            test: "test3",
            test4: "test4"
          },
          firstName: "Vanya",
          lastName: "Kulinich"
        },
        reminders: {
          "1549061820000": {
            date: "02.02.2019",
            dateMs: 1549061820000,
            dateUTC: "2019-02-01T22:57:00.000Z",
            expired: true,
            text: "test",
            time: "00:57"
          },
          "1549785600000": {
            date: "10.02.2019",
            dateMs: 1549785600000,
            dateUTC: "2019-02-10T08:00:00.000Z",
            expired: false,
            text: "test2",
            time: "10:00"
          }
        }
      }
    },
    actions: { ...actions },
    mutations: { ...mutations },
    getters: { ...getters }
  });

export default store;
