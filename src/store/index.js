import { createStore } from 'vuex';
import router from "../router/index";

export default createStore({
  state: {
    BASE_API_URL: "http://localhost:8000",
    userInfo: localStorage.getItem("user-info")
  },
  getters: {
    base_api_url(state) {
      return state.BASE_API_URL;
    },
    userInfo(state) {
      return JSON.parse(state.userInfo);
    }
  },
  mutations: {
    redirectToPage(state, payload) {
      router.push(payload);
    },
    setUserInfo(state, newUserInfo) {
      // alter user info in local storage
      localStorage.setItem("user-info", JSON.stringify(newUserInfo));
      // alter user info in state for vuex
      state.userInfo = localStorage.getItem("user-info");
    },
    clearUserInfo(state) {
      // clear user info from local storage
      localStorage.clear("user-info");
      // clear user info from state in vuex
      state.userInfo = null;
    }
  },
  actions: {
    redirectToPage({ commit }, payload) {
      commit("redirectToPage", payload);
    }
  },
});