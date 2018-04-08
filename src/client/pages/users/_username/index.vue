<template>
  <div>
    <h1>{{ this.fetchedUser.email }}</h1>
    <h5>{{ this.fetchedUser.fullname }} </h5>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  middleware: 'authenticated',
  data () {
    return {
      fetchedUser: this.$store.state.fetchedUser,
      dialog: false
    }
  },
  fetch ({ store, params, req }) {
    const email = params.email
    const token = process.SERVER_BUILD ? req.cookies.token : Cookies.get('token')
    return store.dispatch('fetchedUser/fetchUser', { email, token })
  },
  methods: {
    deleteUser () {
      this.dialog = false
      this.$store.dispatch('user/deleteUser')
        .then(() => {
          this.$router.replace({ path: '/' })
        })
    }
  }
}
</script>
