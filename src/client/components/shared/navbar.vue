<template>
  <div>
    <h4>plor</h4>
    <nuxt-link to="/app">Posts</nuxt-link>
    <nuxt-link to="/manage">Manage</nuxt-link>
    <nuxt-link v-if="username" to="/users" class="profile">
      <image src="/images/placeholders/image.png" />
      {{ username }}
    </nuxt-link>
    <nuxt-link v-else to="/users/auth/sign-in">Login</nuxt-link>
  </div>
</template>

<script>
export default {
  computed: {
    username () {
      return this.$store.state.user.username || null
    }
  }
}
</script>

<style lang="scss">
</style>
