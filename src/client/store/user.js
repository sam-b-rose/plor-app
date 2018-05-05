import axios from '~/plugins/axios';
import Cookies from 'js-cookie';

export const state = () => {
  return {
    isAuthenticated: false,
    name: '',
    email: ''
  };
};

export const mutations = {
  REGISTER_REQUEST(state) {
    state.registerPending = true;
    console.log('Register pending...');
  },
  REGISTER_SUCCESS(state, data) {
    state.name = data.user.name;
    state.email = data.user.email;
    state.gravatar = data.user.gravatar;
    state.isAuthenticated = true;
    console.log('Register success!');
  },
  REGISTER_FAILURE(state, error) {
    console.log('Register failure.');
    console.error(error);
  },
  LOGIN_REQUEST(state) {
    state.registerPending = false;
    console.log('Login pending...');
  },
  LOGIN_SUCCESS(state, data) {
    state.name = data.user.name;
    state.email = data.user.email;
    state.gravatar = data.user.gravatar;
    state.isAuthenticated = true;
    console.log('Login success!');
  },
  LOGIN_FAILURE(state, error) {
    console.log('Login failure.', error.response.data);
    console.error(error);
  },
  LOGOUT_REQUEST(state) {
    console.log('Logout request pending....');
  },
  LOGOUT_SUCCESS(state, message) {
    state.isAuthenticated = false;
    state.name = '';
    state.email = '';
    console.log('Logout success!', message);
  },
  LOGOUT_FAILURE(state, error) {
    console.log('Logout failure.', error.response.data);
    console.error(error);
  },
  UPDATE_ACCOUNT_REQUEST(state) {
    console.log('Update account pending...');
  },
  UPDATE_ACCOUNT_SUCCESS(state, data) {
    state.name = data.user.name;
    state.email = data.user.email;
    console.log('Update account success!');
  },
  UPDATE_ACCOUNT_FAILURE(error) {
    console.log('Update account failure.', error.response.data);
    console.error(error);
  },
  FORGOT_PASSWORD_REQUEST(state) {
    console.log('Sending password reset email pending...');
  },
  FORGOT_PASSWORD_SUCCESS(state, data) {
    console.log('Password reset email sent!');
  },
  FORGOT_PASSWORD_FAILURE(error) {
    console.log('Password reset email send failure.', error.response.data);
    console.error(error);
  },
  RESET_PASSWORD_REQUEST(state) {
    console.log('Password reset pending...');
  },
  RESET_PASSWORD_SUCCESS(state, data) {
    console.log('Password reset sent!');
  },
  RESET_PASSWORD_FAILURE(error) {
    console.log('Password reset failure.', error.response.data);
    console.error(error);
  }
};

export const actions = {
  async register({ commit }, payload) {
    try {
      commit('REGISTER_REQUEST');
      let { data } = await axios.post('/users/register', payload);
      commit('REGISTER_SUCCESS', data);
      commit('notification/SUCCESS', data, { root: true });
    } catch (error) {
      commit('REGISTER_FAILURE', error);
      commit('notification/FAILURE', error.response.data, { root: true });
    }
  },
  async login({ commit }, payload) {
    try {
      commit('LOGIN_REQUEST');
      commit('notification/PENDING', null, { root: true });
      let { data } = await axios.post('/users/login', payload);
      commit('LOGIN_SUCCESS', data);
      commit('notification/SUCCESS', data, { root: true });
    } catch (error) {
      commit('LOGIN_FAILURE', error);
      commit('notification/FAILURE', error.response.data, { root: true });
    }
  },
  async logout({ commit }) {
    try {
      commit('LOGOUT_REQUEST');
      let { data } = await axios.post('/users/logout');
      commit('LOGOUT_SUCCESS', data);
      commit('notification/SUCCESS', data, { root: true });
      commit('CLEAR_LISTS', null, { root: true });
    } catch (error) {
      commit('LOGOUT_FAILURE', error);
      commit('notification/FAILURE', error.response.data, { root: true });
    }
  },
  async updateAccount({ state, commit }, payload) {
    try {
      commit('UPDATE_ACCOUNT_REQUEST');
      let { data } = await axios.post(`/users/account`, payload);
      commit('UPDATE_ACCOUNT_SUCCESS', data);
      commit('notification/SUCCESS', data, { root: true });
    } catch (error) {
      commit('UPDATE_ACCOUNT_FAILURE', error);
      commit('notification/FAILURE', error.response.data, { root: true });
    }
  },
  async forgotPassword({ state, commit }, payload) {
    try {
      commit('FORGOT_PASSWORD_REQUEST');
      let { data } = await axios.post(`/users/account/forgot`, payload);
      commit('FORGOT_PASSWORD_SUCCESS', data);
      commit('notification/SUCCESS', data, { root: true });
    } catch (error) {
      commit('FORGOT_PASSWORD_FAILURE', error);
      commit('notification/FAILURE', error.response.data, { root: true });
    }
  },
  async resetPassword({ state, commit }, payload) {
    try {
      commit('RESET_PASSWORD_REQUEST');
      let { data } = await axios.post(`/users/account/reset/${token}`, payload);
      commit('RESET_PASSWORD_SUCCESS', data);
      commit('notification/SUCCESS', data, { root: true });
    } catch (error) {
      commit('RESET_PASSWORD_FAILURE', error);
      commit('notification/FAILURE', error.response.data, { root: true });
    }
  }
};
