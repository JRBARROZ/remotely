import { createStore } from "vuex";
const server = "http://localhost:8000/api";
const axios = require("axios").default;
import router from '../router';

const auth = {
  namespaced: true,
  state: {
    loggedUser: JSON.parse(localStorage.getItem("logged-user")) ?? {},
  },
  mutations: {
    setLoggedUser: (state, user) => {
      state.loggedUser = { ...user };
    },
  },
  actions: {
    signIn: ({ commit, dispatch }, data) => {
      return new Promise((resolve, reject) => {
        commit("request", null, { root: true });
        axios
          .post(`${server}/auth/login`, data)
          .then((response) => {
            const token = response.data.access_token;
            localStorage.setItem("user-token", token);
            commit("setToken", token, { root: true });
            dispatch("userRequest").then(() => {
              resolve(response);
            });
          })
          .catch((error) => {
            if (error.response.status < 500)
              commit("error", "Credenciais inválidas", { root: true });
            else {
              commit(
                "error",
                "We could not validate your credentials. Try again later",
                { root: true }
              );
              localStorage.removeItem("user-token");
            }
            reject(error);
          });
      });
    },
    signUp: ({ commit, dispatch }, data) => {
      return new Promise((resolve, reject) => {
        commit("request", null, { root: true });
        axios
          .post(`${server}/auth/register`, data)
          .then((response) => {
            commit("success", "Registro efetuado com sucesso", { root: true });
            resolve(response);
          })
          .catch((error) => {
            const stat = [];
            if (error.response.status < 500) {
              const data = JSON.parse(error.response.data);
              if (data.password) {
                if (data.password.length > 1) {
                  stat.push(data.password[0]);
                  stat.push(data.password[1]);
                } else {
                  stat.push(data.password[0]);
                }
              }
              if (data.email) stat.push(data.email[0]);
              if (data.error) stat.push(data.error[0]);
            }
            commit("error", stat, { root: true });
            reject(error);
          });
      });
    },
    userRequest: async ({ commit, rootState }) => {
      try {
        commit("request", null, { root: true });
        if (!rootState.token) {
          commit("resetStatus", null, { root: true });
          return;
        }
        const options = {
          headers: {
            Authorization: `Bearer ${rootState.token}`,
          },
        };
        const response = await axios.get(
          `${server}/auth/user-profile`,
          options
        );
        if (response.status === 200) {
          commit("setLoggedUser", response.data);
          const emailVerified = response.data.email_verified_at !== null;
          commit("hasValidatedEmail", emailVerified, { root: true });
          localStorage.setItem("logged-user", JSON.stringify(response.data));
        }
      } catch (error) {
        commit("error", null, { root: true });
      }
    },
    logout: ({ commit, rootState }) => {
      return new Promise((resolve, reject) => {
        commit('setToken', "", { root: true });
        localStorage.removeItem("user-token");
        localStorage.removeItem("logged-user");
        localStorage.removeItem("orgList");
        localStorage.removeItem("projList");
        commit("setLoggedUser", {});
        resolve();
      });
    },
    verifyIfHasEmailValidated: ({ commit, rootState }, email) => {    
      axios.get(`${server}/has-email-verified`, {
          params: {
            email
          }
        })
        .then((response) => {
          if (response.data.hasEmailVerified) {
            commit("hasValidatedEmail", response.data.hasEmailVerified, { root: true });
            router.push('/email/verify/success');
          } else {
            router.push('/verify');
          }
        })
        .catch((error) => {
          console.log('err action', error);
        })
    },
    forgotPassword: ({ commit, rootState }, email) => {
      const data = { email: email };
      return new Promise((resolve, reject) => {
        axios
          .post(`${server}/forgot-password`, data)
          .then((response) => {
            console.log('forgot',response.data);
            commit("success", response.data.message, { root: true });
            resolve(response);
          })
          .catch((error) => {
            commit("error", error.response.data.message, { root: true });
            reject(error);
          });
      });
    },
    resetPassword: ({ commit, rootState}, data) => {
      axios.post(`${server}/reset-password`, data)
        .then((response) => console.log('res',response))
        .catch((error) => console.log('err',error));
    },
    resendVerificationEmail: async ({ commit, rootState }) => {
      if (!rootState.token) {
        commit("resetStatus", null, { root: true });
        return;
      }
      try {
        const options = {
          headers: {
            "Authorization": `Bearer ${rootState.token}`,
          },
        };
        const response = await axios.post(`${server}/auth/email/verify/resend`, null, options);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

const organization = {
  namespaced: true,
  state: {
    addOrganization: false,
    orgList: JSON.parse(localStorage.getItem("orgList")) ?? [],
  },
  mutations: {
    changeOrgList: (state, payload) => {
      if (payload != null) {
        state.orgList = payload;
      }
      for (const org of state.orgList) {
        org["projects"] = [];
        for (const proj of JSON.parse(localStorage.getItem("projList")) ?? []) {
          if (org.id == proj.org_id) {
            org.projects.push(proj);
          }
        }
      }
      localStorage.setItem("orgList", JSON.stringify(state.orgList));
    },
    setAddOrganization: (state, payload) => {
      state.addOrganization = payload;
    }
  },
  actions: {
    add: ({ dispatch, rootState }, rawData) => {
      const data = {
        name: rawData,
      };
      axios.post(`${server}/organization/add`, data, {
        headers: { Authorization: `Bearer ${rootState.token}` },
      });
      dispatch("setList");
    },
    setList: async ({ state, commit, rootState }) => {
      const options = {
        headers: {
          Authorization: `Bearer ${rootState.token}`,
        },
      };
      const response = await axios.get(`${server}/organization/list`, options);
      commit("changeOrgList", response.data);
    },
    update: async ({ state, commit, rootState }, data) => {
      const options = {
        headers: {
          Authorization: `Bearer ${rootState.token}`,
        },
      };
      const response = await axios.put(
        `${server}/organization/update`,
        data,
        options
      );
      if (response.status === 200) {
        for (const key in state.orgList) {
          if (state.orgList[key].id === data.id) {
            const org = state.orgList[key];
            org.name = data.name;
            state.orgList.splice(key, 1, org);
            commit("changeOrgList", state.orgList);
            break;
          }
        }
      }
    },
    remove: async ({ commit, dispatch, state, rootState }, index) => {
      const response = await axios.delete(`${server}/organization/${index}`, {
        headers: { Authorization: `Bearer ${rootState.token}` },
      });
      if (response.status === 200) {
        for (const key in state.orgList) {
          if (state.orgList[key].id === index) {
            if(state.orgList[key].projects.length > 0){
              dispatch("project/setList", null, { root: true });
              for (let i = 0; i < state.orgList[key].projects.length; i++) {
                const element = state.orgList[key].projects[i];
                if(element.tasks.length > 0){
                  dispatch("task/setList", null, { root: true });
                  break;
                }
              }
            }
            state.orgList.splice(key, 1);
            commit("changeOrgList", state.orgList);
            break;
          }
        }
      }
    },
  },
};

const project = {
  namespaced: true,
  state: {
    addProject: false,
    projList: JSON.parse(localStorage.getItem("projList")) ?? [],
  },
  mutations: {
    changeProjList: (state, payload) => {
      if(payload != null){
        state.projList = payload;
      }
      for (const proj of state.projList) {
        proj["tasks"] = [];
        for (const task of JSON.parse(localStorage.getItem("taskList")) ?? []) {
          if (proj.id == task.project_id) {
            proj.tasks.push(task);
          }
        }
      }
      localStorage.setItem("projList", JSON.stringify(state.projList));
    },
    setAddProject: (state, payload) => {
      state.addProject = payload;
    }
  },
  actions: {
    add: async ({ dispatch, rootState }, data) => {
      const response = await axios.post(`${server}/project/add`, data, {
        headers: { Authorization: `Bearer ${rootState.token}` },
      });
      if(response.status == 200){
        dispatch("setList");
      }
    },
    setList: async ({ commit, dispatch, rootState }) => {
      const options = {
        headers: {
          Authorization: `Bearer ${rootState.token}`,
        },
      };
      const response = await axios.get(`${server}/project/list`, options);
      commit("changeProjList", response.data);
      commit("organization/changeOrgList", null, { root: true });
    },
    update: async ({ state, commit, rootState }, data) => {
      const options = {
        headers: {
          Authorization: `Bearer ${rootState.token}`,
        },
      };
      const response = await axios.put(
        `${server}/project/update`,
        data,
        options
      );
      if (response.status === 200) {
        for (const key in state.projList) {
          if (state.projList[key].id === data.id) {
            const proj = state.projList[key];
            proj.name = data.name;
            proj.status = data.status;
            state.projList.splice(key, 1, proj);
            commit("changeProjList", state.projList);
            commit("organization/changeOrgList", null, { root: true });
            break;
          }
        }
      }
    },
    remove: async ({ commit, dispatch, state, rootState }, index) => {
      const response = await axios.delete(`${server}/project/${index}`, {
        headers: { Authorization: `Bearer ${rootState.token}` },
      });
      if (response.status === 200) {
        for (const key in state.projList) {
          if (state.projList[key].id === index) {
            if(state.projList[key].tasks.length > 0){
              dispatch("task/setList", null, { root: true });
            }
            state.projList.splice(key, 1);
            commit("changeProjList", state.projList);
            commit("organization/changeOrgList", null, { root: true });
            break;
          }
        }
      }
    },
  },
};

const task = {
  namespaced: true,
  state: {
    addTask: false,
    taskList: JSON.parse(localStorage.getItem("taskList")) ?? [],
  },
  mutations: {
    changeTaskList: (state, payload) => {
      state.taskList = payload;
      localStorage.setItem("taskList", JSON.stringify(state.taskList));
    },
    setAddTask: (state, payload) => {
      state.addTask  = payload;
    }
  },
  actions: {
    add: async ({ dispatch, rootState }, rawData) => {
      let date = rawData.deadline.split('-');
      const data = {
        title: rawData.title,
        deadline: new Date(date[0], date[1]-1, date[2]).toISOString().slice(0, 19).replace('T', ' '),
        status: "Ongoing",
        description: rawData.description,
        project_id: rawData.projId,
      }
      const response = await axios.post(`${server}/task/add`, data, {
        headers: { Authorization: `Bearer ${rootState.token}` },
      });
      if(response.status === 200){
        dispatch("setList", data);
      }
    },
    setList: async ({commit, rootState }) => {
      const options = {
        headers: {
          Authorization: `Bearer ${rootState.token}`,
        },
      };
      const response = await axios.get(`${server}/task/list`, options);
      commit("changeTaskList", response.data);
      commit("project/changeProjList", null, {root: true});
      commit("organization/changeOrgList", null, { root: true });
    },
    update: async ({ state, commit, rootState }, data) => {
      const options = {
        headers: {
          Authorization: `Bearer ${rootState.token}`,
        },
      };
      const response = await axios.put(
        `${server}/task/update`,
        data,
        options
      );
      if (response.status === 200) {
        for (const key in state.taskList) {
          if (state.taskList[key].id === data.id) {
            const task = state.taskList[key];
            task.title = data.title;
            task.description = data.description;
            task.status = data.status;
            state.taskList.splice(key, 1, task);
            commit("changeTaskList", state.taskList);
            commit("project/changeProjList", null, {root: true});
            commit("organization/changeOrgList", null, {root: true});
            break;
          }
        }
      }
    },
    remove: async ({ commit, state, rootState }, index) => {
      const response = await axios.delete(`${server}/task/${index}`, {
        headers: { Authorization: `Bearer ${rootState.token}` },
      });
      if (response.status === 200) {
        for (const key in state.taskList) {
          if (state.taskList[key].id === index) {
            state.taskList.splice(key, 1);
            commit("changeTaskList", state.taskList);
            commit("project/changeProjList", null, { root: true });
            commit("organization/changeOrgList", null, { root: true });
            break;
          }
        }
      }
    },
  }
};

export default createStore({
  state: {
    token: localStorage.getItem("user-token") ?? "",
    emailValidated: false,
    status: [],
    loading: false,
  },
  getters: {
    hasEmailVerified: (state) => state.emailValidated,
    isAuthenticated: (state) => state.token,
    authStatus: (state) => state.status,
  },
  mutations: {
    hasValidatedEmail: (state, value) => {
      state.emailValidated = value;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    request: (state) => {
      state.status = [null, "Loading..."];
    },
    success: (state, payload) => {
      state.status = ["success", payload];
    },
    error: (state, message) => {
      state.status = ["error", message];
    },
    logout: (state, message) => {
      state.status = ["success", message];
    },
    setToken: (state, token) => {
      state.token = token;
    },
    resetStatus: (state) => {
      state.status = [];
    },
  },
  actions: {},
  modules: {
    auth: auth,
    organization: organization,
    project: project,
    task: task
  },
});
