import axios from '~/plugins/axios';
import jwtDecode from 'jwt-decode';

export const state = () => {
  return {};
};
export const mutations = {
  SET_USER(state, data) {
    state.user.isAuthenticated = true;
    state.user.name = data.name;
    state.user.email = data.email;
    state.user.gravatar = data.gravatar;
    state.connections.connections = data.connections;
  }
};
export const actions = {
  nuxtServerInit({ commit, state }, { req }) {
    const { user } = req;
    if (user) commit('SET_USER', user);
  }
};
