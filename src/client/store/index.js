import axios from '~/plugins/axios';

export const state = () => {
  return {
    user: null,
    isDev: true,
    isProd: true
  };
};
export const mutations = {
  SET_USER(state, data) {
    state.user.isAuthenticated = true;
    state.user.name = data.name;
    state.user.email = data.email;
    state.user.gravatar = data.gravatar;
    state.connections.connections = data.connections;
  },
  SET_ENV(state, isProd) {
    state.isDev = !isProd;
    state.isProd = isProd;
  }
};
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    const { user } = req;
    if (user) commit('SET_USER', user);
    const isProd = process.env.NODE_ENV === 'production';
    commit('SET_ENV', isProd);
  },
  async joingMailing({ commit }, payload) {
    try {
      // commit('JOIN_MAILING_REQUEST');
      let { data } = await axios.post('/join', payload);
      // commit('JOIN_MAILING_SUCCESS', data);
      commit('notification/SUCCESS', data, { root: true });
    } catch (error) {
      // commit('JOIN_MAILING_FAILURE', error);
      // commit('notification/FAILURE', error.response.data, { root: true });
    }
  }
};
