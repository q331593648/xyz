const login = {
  state: {
    userName: localStorage.getItem("userName") || "",
    token: localStorage.getItem("token") || null
  },
  mutations: {
    TOKEN: (state, String) => {
      state.token = String;
    },
    USERNAME: (state, String) => {
      state.token = String;
    }
  },
  actions: {
    token({ commit }, String) {
      commit("TOKEN", String);
    },
    userName({ commit }, String) {
      commit("USERNAME", String);
    }
  }
};

export default login;
