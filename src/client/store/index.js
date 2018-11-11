import axios from '~/plugins/axios';

export const state = () => {
  return {
    focus: false,
    user: null,
    isDev: true,
    isProd: true,
    filterItems: [
      { text: 'Tags' },
      { text: 'Social Accounts' },
      { text: 'Members' },
      { text: 'Media' }
    ]
  };
};
export const mutations = {
  SET_FOCUS(state, focus) {
    state.focus = focus;
  },
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
      let { data } = await axios.post('/join', payload);
      commit('notification/SUCCESS', data, { root: true });
    } catch (error) {
      console.error(error);
      commit('notification/FAILURE', error.response.data, { root: true });
    }
  }
};
