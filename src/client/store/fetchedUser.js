import axios from '~/plugins/axios'

export const state = () => {
  return {
    email: '',
    fullName: ''
  }
}

export const mutations = {
  FETCH_USER_REQUEST (state) {
    console.log('fetchUser pending...')
  },
  FETCH_USER_SUCCESS (state, data) {
    state.email = data.email
    state.fullName = data.fullName
    console.log('fetchUser success!')
  },
  FETCH_USER_FAILURE (state, error) {
    console.error(error.response.data.error)
  }
}

export const actions = {
  async fetchUser ({ state, commit }, { email }) {
    try {
      commit('FETCH_USER_REQUEST')
      let { data } = await axios.get(`/users/${email}`)
      commit('FETCH_USER_SUCCESS', data)
    } catch (error) {
      commit('FETCH_USER_FAILURE', error)
    }
  }
}
