<template>
  <nuxt-link :to="{ name: 'users-auth-sign-in' }">Login</nuxt-link>
</template>

<script>
import signIn from '../components/auth/sign-in'

export default {
  components: {
    signIn
  }
}
</script>

<style scoped>
</style>
